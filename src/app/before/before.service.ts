import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BeforeService {
  _local_config: any;
  private _local_config_path = "/assets/config/GlobalConfiguration.json";
  constructor(private http: HttpClient) {
    console.log("### BeforeService: constructor start.");
  }

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
}
