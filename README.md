## 如何設定APP_INITIALIZER，讓專案初始化時先執行HttpClient取得Configuration後才執行各Component
### How to use APP_INITIALIZER in Angular for get configuration before app initialization

#### 內容若有錯誤請讓我知道，感謝！
##### [線上範例 in StackBlitz](https://stackblitz.com/edit/angular-app-initializer-practice)

## 前言：<br>
前一篇[使用Promise/Async/Await等待所有異步函數](https://github.com/simpleget/AngularJS-Promise-and-async-await)，其目的是為了在Angular初始化時可以先取得Configuration，寫了一個[Global Singleton Service](https://blog.johnwu.cc/article/angular-4-services.html#3-Singleton-Service)想做到這件事情，但Typescript的Singleton無法與以前寫的JAVA相同，避免多執行緒同時競爭而產生多個實例，在找不到能使用類似於`JAVA synchronized`相關寫法時，發現了`APP_INITIALIZER`的設置，在測試後覺得能達到我的需求，因此做個紀錄。
<br><br>
先假設目前有一個`Service`，要提供給`Component`取得`GlobalConfiguration`的資料，<br>
預計的程式流程為：
  1. `beforeServiceInit()`內執行`getConfiguration()`並回傳Promise
  2. `getConfiguration()`內判斷`_local_config`是否有值，若有值則執行resolve()，結束Promise
  3. `Component`各自注入`Service`後，執行`beforeServiceInit().then()`，再取得`Service`內的變數`_local_config`

### 期望的結果

    ParentComponent 先透過 HttpClient 取得資料後，ChildComponent 再次執行 beforeServiceInit() 時，
    因 _local_config 有值，所以不會再次使用 HttpClient 取得資料。

##### before.service.ts
```javascript
  _local_config: any;
  // Data source
  private _local_config_path = "/assets/config/GlobalConfiguration.json";
  constructor(private http: HttpClient) {
    console.log("### BeforeService: constructor start.");
  }

  /**
   * HttpClient取得資料後，回傳Promise讓Component繼續後面的流程
   */
  async beforeServiceInit() {
    console.log("### BeforeService: beforeServiceInit start.");
    const local_config = this.getConfiguration();
    await local_config;
    return new Promise(r => r());
  }

  private getConfiguration() {
    return new Promise(resolve => {
      if (this._local_config) {
        resolve();
      } else {
        this.http
          .get(this._local_config_path)
          .toPromise()
          .then(data => {
            console.log("### BeforeService: getConfiguration by httpClient");
            this._local_config = data;
            resolve();
          });
      }
    });
  }
```

接著是父子`Component`，各自注入`BeforeService`後，皆要在取得資料後，存取`_local_config`變數
##### before.parent.component.ts
```javascript
  ngOnInit() {
    console.log("### BeforeParentComponent ngOnInit");
    this.beforeService.beforeServiceInit().then(data => {
      console.log("### BeforeParentComponent config", this.beforeService._local_config ###);
    });
  }
```
##### before.child.component.ts
```javascript
  ngOnInit() {
    console.log("### BeforeChildComponent ngOnInit");
    this.beforeService.beforeServiceInit().then(data => {
      console.log(
        "### BeforeChildComponent config",
        this.beforeService._local_config
      );
    });
  }
```
但事與願違，`ParentComponent`與`ChildComponent`執行到`BeforeService.beforeServiceInit()`的時間點太相近，導致`ChildComponet`執行時，`ParentComponent`尚未執行結束，所以判斷`_local_config`還是空的，再次發出`HttpClient`的請求。

    ### BeforeService: constructor start.
    ### BeforeParentComponent constructor
    ### BeforeChildComponent constructor
    ### BeforeParentComponent ngOnInit                // BeforeParentComponent進入init生命週期
    ### BeforeService: beforeServiceInit start.       // Exec beforeServiceInit()
    ### BeforeChildComponent ngOnInit                 // BeforeChildComponent進入init生命週
    ### BeforeService: beforeServiceInit start.       // parent尚未結束，_local_config為空，再次發出請求
    ### BeforeService: getConfiguration by httpClient // Parent HttpClient請求結束
    ### BeforeParentComponent config
      {configuration: {…}, versions: "v1.27"}
    ### BeforeService: getConfiguration by httpClient // Child HttpClient請求結束
    ### BeforeChildComponent config
      {configuration: {…}, versions: "v1.27"}

### OK，這不是我要的結果。

## 進入正題
在找到`APP_INITIALIZER`的方法後，修改流程：

    在執行`AppComponent`之前，就先發請求取得所有資料

##### after.service.ts
大致上與`before.service.ts`一樣，差別在不用判斷`this._local_config`是否有值囉
```javascript
  private getConfiguration() {
    return new Promise(resolve => {
      this.http
        .get(this._local_config_path)
        .toPromise()
        .then(data => {
          console.log("### AfterService: getConfiguration by httpClient");
          this._local_config = data;
          resolve();
        });
    });
  }
```
##### app.module.ts
```javascript
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (afterService: AfterService) => () =>
        afterService.afterServiceInit(),
      deps: [AfterService],
      multi: true
    }
  ]
```
`useFactory`注入`AfterService`，並執行指定的function`afterServiceInit()`<br>
`deps`依賴於`AfterService`<br>
`multi`設置`true`，代表使用同一個`Token`註冊不同的`provide`<br>
<br>
在`ParentCompont`與`ChildComponent`的`OnInit()`內直接存取`this.afterService._local_config`
```javascript
  ngOnInit() {
    console.log("### AfterParentComponent ngOnInit");
    console.log("### AfterParentComponent config",this.afterService._local_config);
  }
```
最後的結果是：

    ### AfterService: constructor start.
    ### AfterService: afterServiceInit start.         // 執行afterServiceInit()
    ### AfterService: getConfiguration by httpClient  // HttpClient取得資料完成
    ### AppComponent constructor start.               // AppComponent執行
    ### AfterParentComponent constructor
    ### AfterChildComponent constructor
    ### AfterParentComponent ngOnInit
    ### AfterParentComponent config
      {configuration: {…}, versions: "v1.27"}         // ParentComponent取得資料
    ### AfterChildComponent ngOnInit
    ### AfterChildComponent config
      {configuration: {…}, versions: "v1.27"}         // ChildComponent取得資料

這就是當初期望的成果，只有發出一次`HttpClient`，完成後才開始執行`AppComponent`之後的流程。

###### 參考資料
1. [https://ithelp.ithome.com.tw/articles/10207812](https://ithelp.ithome.com.tw/articles/10207812)
2. [https://ithelp.ithome.com.tw/articles/10208240](https://ithelp.ithome.com.tw/articles/10208240)
