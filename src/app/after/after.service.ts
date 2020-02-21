import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AfterService {
  _local_config: any = {};
  private _local_config_path = "/assets/config/GlobalConfiguration.json";
  constructor(private http: HttpClient) {
    console.log("### AfterService: constructor start.");
  }

  /**
   * First exec for APP_INITIALIZER in app.module.ts
   */
  async afterServiceInit() {
    console.log("### AfterService: afterServiceInit start.");
    // get globalVariable
    const local_config = this.getConfiguration();

    await local_config;
    return new Promise(r => r());
  }

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
}
