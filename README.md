## 如何設定APP_INITIALIZER，讓專案初始化時先執行HttpClient取得Configuration後才執行各Component
### How to use APP_INITIALIZER in Angular for get configuration before app initialization

#### 內容若有錯誤請讓我知道，感謝！
##### [線上範例 in StackBlitz](https://stackblitz.com/edit/angular-app-initializer-practice)

## 前言：<br>
前一篇[使用Promise/Async/Await等待所有異步函數](https://github.com/simpleget/AngularJS-Promise-and-async-await)，其目的是為了在Angular初始化時可以先取得Configuration，寫了一個[Global Singleton Service](https://blog.johnwu.cc/article/angular-4-services.html#3-Singleton-Service)想做到這件事情，但Typescript的Singleton無法與以前寫的JAVA相同，避免多執行緒同時競爭而產生多個實例，在找不到能使用類似於`JAVA synchronized`相關寫法時，發現了`APP_INITIALIZER`的設置，在測試後覺得能達到我的需求，因此做個紀錄。

#### To be continue...
