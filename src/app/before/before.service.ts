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
}
