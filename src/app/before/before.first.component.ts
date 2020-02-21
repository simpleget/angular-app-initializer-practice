import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-before",
  templateUrl: "./before.component.html",
  styleUrls: ["./before.component.scss"]
})
export class BeforeFirstComponent implements OnInit {
  constructor() {
    console.log("### BeforeFirstComponent constructor");
  }

  ngOnInit() {
    console.log("### BeforeFirstComponent ngOnInit");
  }
}
