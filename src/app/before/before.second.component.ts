import { Component, OnInit } from "@angular/core";
import { BeforeService } from "./before.service";

@Component({
  selector: "app-before-second",
  templateUrl: "./before.second.component.html",
  styleUrls: ["./before.component.scss"]
})
export class BeforeSecondComponent implements OnInit {
  constructor(private beforeService: BeforeService) {
    console.log("### BeforeSecondComponent constructor");
  }

  ngOnInit() {
    console.log("### BeforeSecondComponent ngOnInit");
    // Get configuration in ngOnInit
    this.beforeService
      .initPromise()
      .then(
        data => {
          console.log('### BeforeSecondComponent initPromise', data);
        }
      );
  }
}
