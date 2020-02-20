import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BeforeService {
  private _local_config: any;
  private _local_config_path = "/assets/config/GlobalConfiguration.json";

  private _local_version: any;
  private _local_version_path = "/assets/config/VerNum.json";

  private _local_update: any;
  private _local_update_path = "/assets/config/update.json";

  constructor(private http: HttpClient) {
    console.log("### GlobalCollections: constructor start.");
  }

  async globalCollectionsInit() {
    console.log("### GlobalCollections: globalCollectionsInit start.");
    // get globalVariable
    const local_config = this.getConfiguration();
    // get verNum
    const local_version = this.getVersion();
    // get update
    const local_update = this.getUpdate();

    await local_config;
    await local_version;
    await local_update;
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

  private getConfiguration() {
    return new Promise(resolve => {
      if (this._local_config) {
        console.log("### GlobalCollections: _local_config allready exist.");
        resolve();
      } else {
        this.http
          .get(this._local_config_path)
          .toPromise()
          .then(data => {
            console.log(
              "### GlobalCollections: get _local_config by httpClient"
            );
            this._local_config = data as StructGlobalVariable;
            resolve();
          });
      }
    });
  }

  private getVersion() {
    return new Promise(resolve => {
      if (this._local_version) {
        console.log("### GlobalCollections: _local_version allready exist.");
        resolve();
      } else {
        this.http
          .get(this._local_version_path)
          .toPromise()
          .then(data => {
            console.log(
              "### GlobalCollections: get _local_version by httpClient"
            );
            this._local_version = data;
            resolve();
          });
      }
    });
  }

  private getUpdate() {
    return new Promise(resolve => {
      if (this._local_update) {
        console.log("### GlobalCollections: _local_update allready exist.");
        resolve();
      } else {
        this.http
          .get(this._local_update_path)
          .toPromise()
          .then(data => {
            console.log(
              "### GlobalCollections: get _local_update by httpClient"
            );
            this._local_update = data;
            resolve();
          });
      }
    });
  }
}
