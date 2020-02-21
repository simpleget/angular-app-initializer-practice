import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-before-second",
  templateUrl: "./before.second.component.html",
  styleUrls: ["./before.component.scss"]
})
export class BeforeSecondComponent implements OnInit {
  constructor() {
    console.log("### BeforeSecondComponent constructor");
  }

  ngOnInit() {
    console.log("### BeforeSecondComponent ngOnInit");
  }
}
