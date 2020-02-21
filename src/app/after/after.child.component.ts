import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-after-child",
  templateUrl: `<p>child</p>`
})
export class AfterChildComponent implements OnInit {
  constructor() {
    console.log('### AfterChildComponent constructor');
  }

  ngOnInit() {
    console.log('### AfterChildComponent ngOnInit');
  }
}
