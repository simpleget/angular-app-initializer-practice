import { Component, OnInit } from "@angular/core";
import { BeforeService } from "./before.service";

@Component({
  selector: "app-before-child",
  template: `<p>sub</p>`
})
export class BeforeChildComponent implements OnInit {
  constructor(private beforeService: BeforeService) {
    console.log("### BeforeChildComponent constructor");
  }

  ngOnInit() {
    console.log("### BeforeChildComponent ngOnInit");
    // Get configuration in ngOnInit
    this.beforeService
      .initPromise()
      .then(
        data => {
          console.log('### BeforeChildComponent initPromise', data);
        }
      );
  }
}
