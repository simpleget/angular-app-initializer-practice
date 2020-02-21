import { Component, OnInit } from "@angular/core";
import { BeforeService } from "./before.service";

@Component({
  selector: "app-before-parent",
  template: `<p>parent</p><app-before-sub></app-before-sub>`
  // styleUrls: ["./before.component.scss"]
})
export class BeforeParentComponent implements OnInit {
  constructor(private beforeService: BeforeService) {
    console.log("### BeforeParentComponent constructor");
  }

  ngOnInit() {
    console.log("### BeforeParentComponent ngOnInit");
    // Get configuration in ngOnInit
    this.beforeService.initPromise().then(data => {
      console.log("### BeforeParentComponent initPromise", data);
    });
  }
}
