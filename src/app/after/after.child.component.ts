import { Component, OnInit } from "@angular/core";
import { AfterService } from './after.service';

@Component({
  selector: "app-after-child",
  template: `
    <p>child</p>
  `
})
export class AfterChildComponent implements OnInit {
  constructor(
    private afterService: AfterService
  ) {
    console.log("### AfterChildComponent constructor");
  }

  ngOnInit() {
    console.log("### AfterChildComponent ngOnInit");
    console.log(
      "### AfterChildComponent config",
      this.afterService._local_config
    );
    console.log(
      "### AfterChildComponent updated",
      this.afterService._local_update
    );
  }
}
