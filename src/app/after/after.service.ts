import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AfterService {
  private _local_config_path = '/assets/config/GlobalConfiguration.json';

  private _local_version: any;
  private _local_version_path = '/assets/config/VerNum.json';

  private _local_update: any;
  private _local_update_path = '/assets/config/update.json';

  private _session_key_of_user_info = '_u';
  private _session_key_of_language = '_l';

  private _login_redirect_path = '/home';

  // used in navigation.component
  private _navigation_item: any;
  private _current_navigation: any;
  private _current_sub_navigation: any;

  constructor(
    private http: HttpClient,
    private session: SessionStorageService,
    private translateService: TranslateService
  ) {
    console.log('### GlobalCollections: constructor start.');
    this.checkUserInfo();
  }

  /**
   * First exec for APP_INITIALIZER in app.module.ts
   */
  async globalCollectionsInit() {
    console.log('### GlobalCollections: globalCollectionsInit start.');
    // get globalVariable
    const local_config = this.getConfiguration();
    // get verNum
    const local_version = this.getVersion();
    // get update
    const local_update = this.getUpdate();
    // init language
    const init_session_language = this.initSessionLanguage();

    await local_config;
    await local_version;
    await local_update;
    await init_session_language;
    return new Promise(r => r());
  }

  get localConfig() {
    return this._local_config;
  }

  get localVersion() {
    return this._local_version;
  }

  get localUpdate() {
    return this._local_update;
  }

  get localUserInfo() {
    return this.session.get(this._session_key_of_user_info);
  }

  set localUserInfo(value: StructSessionUserInfo) {
    // Check if different user before set session, change redirect_path for default.
    if (this.localUserInfo && value.user_id !== this.localUserInfo.user_id) {
      this._login_redirect_path = '/home';
    }
    this.session.set(this._session_key_of_user_info, value);
  }

  get localLanguage() {
    if (!this.session.get(this._session_key_of_language)) {

    }
    return this.session.get(this._session_key_of_language);
  }

  set localLanguage(value: StructSessionLanguage) {
    this.session.set(this._session_key_of_language, value);
    this.changeTranslateOperator();
  }

  get redirect_path() {
    return this._login_redirect_path;
  }

  set redirect_path(value: string) {
    // If window.location.pathname match '/' or '/login*', it will not set redirect_path.
    if (!/^(\/$|\/login)/.test(window.location.pathname)) {
      this._login_redirect_path = value;
    }
  }

  // used in navigation.component start
  get navigation_item() {
    return this._navigation_item;
  }

  set navigation_item(value: any) {
    this._navigation_item = value;
  }

  get current_navigation() {
    return this._current_navigation;
  }

  set current_navigation(value: any) {
    this._current_navigation = value;
  }

  get current_sub_navigation() {
    return this._current_sub_navigation;
  }

  set current_sub_navigation(value: any) {
    this._current_sub_navigation = value;
  }
  // used in navigation.component end

  public clearSessionStorageForUserInfo() {
    this.session.remove(this._session_key_of_user_info);
  }

  private getConfiguration() {
    return new Promise(resolve => {
      if (this._local_config) {
        console.log('### GlobalCollections: _local_config allready exist.');
        resolve();
      } else {
        this.http.get(this._local_config_path)
          .toPromise()
          .then(
            data => {
              console.log('### GlobalCollections: get _local_config by httpClient');
              this._local_config = data as StructGlobalVariable;
              resolve();
            }
          );
      }
    });
  }

  private getVersion() {
    return new Promise(resolve => {
      if (this._local_version) {
        console.log('### GlobalCollections: _local_version allready exist.');
        resolve();
      } else {
        this.http.get(this._local_version_path)
          .toPromise()
          .then(
            data => {
              console.log('### GlobalCollections: get _local_version by httpClient');
              this._local_version = data;
              resolve();
            }
          );
      }
    });
  }

  private getUpdate() {
    return new Promise(resolve => {
      if (this._local_update) {
        console.log('### GlobalCollections: _local_update allready exist.');
        resolve();
      } else {
        this.http.get(this._local_update_path)
          .toPromise()
          .then(
            data => {
              console.log('### GlobalCollections: get _local_update by httpClient');
              this._local_update = data;
              resolve();
            }
          );
      }
    });
  }

  /**
   * Default language id : 13
   */
  private initSessionLanguage() {
    return new Promise(resolve => {
      this.translateService.addLangs(['en', 'zh-tw']);
      if (!this.session.get(this._session_key_of_language)) {
        this.session.set(this._session_key_of_language, {
          language: 13
        });
      }
      this.changeTranslateOperator();
      resolve();
    });
  }

  private changeTranslateOperator() {
    switch (this.session.get(this._session_key_of_language).language) {
      case 2:
        this.translateService.use('en');
        break;
      case 13:
        this.translateService.use('zh-tw');
        break;
    }
  }

  /**
   * Check user info in SessionStorage without page as below:
   * 1. /
   * 2. /login*
   */
  private checkUserInfo() {
    switch (true) {
      case /^(\/$|\/login)/.test(window.location.pathname):
        console.debug('### GlobalCollections path:', window.location.pathname, 'dont check user_id');
        break;
      default:
        console.debug('### GlobalCollections path:', window.location.pathname, 'need check user_id:', !!this.localUserInfo);
        if (!this.localUserInfo) {
          alert('請先登入\nPlease login first.');
          window.location.href = '/login';
        }
        break;
    }
  }
}

export interface StructSessionUserInfo {
  'username': String;
  'user_id': Number;
}

export interface StructSessionLanguage {
  'language': Number;
}
