import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-before",
  templateUrl: "./before.component.html",
  styleUrls: ["./before.component.scss"]
})
export class BeforeComponent implements OnInit {
  constructor() {
    console.log("### BeforeComponent constructor");
  }

  ngOnInit() {
    console.log("### BeforeComponent ngOnInit");
  }
}
