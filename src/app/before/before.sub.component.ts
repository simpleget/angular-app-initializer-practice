import { Component, OnInit } from "@angular/core";
import { BeforeService } from "./before.service";

@Component({
  selector: "app-before-sub",
  template: `<p>sub</p>`
})
export class BeforeSubComponent implements OnInit {
  constructor(private beforeService: BeforeService) {
    console.log("### BeforeSubComponent constructor");
  }

  ngOnInit() {
    console.log("### BeforeSubComponent ngOnInit");
    // Get configuration in ngOnInit
    this.beforeService
      .initPromise()
      .then(
        data => {
          console.log('### BeforeSubComponent initPromise', data);
        }
      );
  }
}
