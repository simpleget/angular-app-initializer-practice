import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BeforeService {
  private _local_config: any;
  private _local_config_path = "/assets/config/GlobalConfiguration.json";

  constructor(private http: HttpClient) {
    console.log("### BeforeService: constructor start.");
  }

  initPromise() {
    return this.http.get(this._local_config_path).toPromise();
  }

  async BeforeServiceInit() {
    console.log("### BeforeService: BeforeServiceInit start.");
    // get globalVariable
    const local_config = this.getConfiguration();

    await local_config;
    return new Promise(r => r());
  }

  get localConfig() {
    return this._local_config;
  }

  private getConfiguration() {
    return new Promise(resolve => {
      if (this._local_config) {
        console.log("### BeforeService: _local_config allready exist.");
        resolve();
      } else {
        this.http
          .get(this._local_config_path)
          .toPromise()
          .then(data => {
            console.log(
              "### BeforeService: get _local_config by httpClient"
            );
            this._local_config = data as any;
            resolve();
          });
      }
    });
  }
}
