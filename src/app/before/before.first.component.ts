import { Component, OnInit } from "@angular/core";
import { BeforeService } from "./before.service";

@Component({
  selector: "app-before-first",
  templateUrl: "./before.first.component.html",
  styleUrls: ["./before.component.scss"]
})
export class BeforeFirstComponent implements OnInit {
  constructor(private beforeService: BeforeService) {
    console.log("### BeforeFirstComponent constructor");
  }

  ngOnInit() {
    console.log("### BeforeFirstComponent ngOnInit");
    // Get configuration in ngOnInit
    this.beforeService
      .initPromise()
      .then(
        data => {
          console.log('### BeforeFirstComponent initPromise', data);
        }
      );
  }
}
