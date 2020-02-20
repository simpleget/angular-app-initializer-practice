import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-after",
  templateUrl: "./after.component.html",
  styleUrls: ["./after.component.scss"]
})
export class AfterComponent implements OnInit {
  constructor() {
    console.log('### AfterComponent constructor');
  }

  ngOnInit() {
    console.log('### AfterComponent ngOnInit');
  }
}
