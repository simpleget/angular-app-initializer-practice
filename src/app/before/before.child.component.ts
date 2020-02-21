import { Component, OnInit } from "@angular/core";
import { BeforeService } from "./before.service";

@Component({
  selector: "app-before-child",
  template: `
    <p>sub</p>
  `
})
export class BeforeChildComponent implements OnInit {
  constructor(private beforeService: BeforeService) {
    console.log("### BeforeChildComponent constructor");
  }

  ngOnInit() {
    console.log("### BeforeChildComponent ngOnInit");

    this.beforeService.beforeServiceInit().then(data => {
      console.log(
        "### BeforeChildComponent config",
        this.beforeService._local_config
      );
    });
  }
}
