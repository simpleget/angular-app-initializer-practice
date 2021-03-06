import { Component, OnInit } from "@angular/core";
import { BeforeService } from "./before.service";

@Component({
  selector: "app-before-parent",
  template: `
    <p>parent</p>
    <app-before-child></app-before-child>
  `
  // styleUrls: ["./before.component.scss"]
})
export class BeforeParentComponent implements OnInit {
  constructor(private beforeService: BeforeService) {
    console.log("### BeforeParentComponent constructor");
  }

  ngOnInit() {
    console.log("### BeforeParentComponent ngOnInit");
    this.beforeService.beforeServiceInit().then(data => {
      console.log(
        "### BeforeParentComponent config",
        this.beforeService._local_config
      );
    });
  }
}
