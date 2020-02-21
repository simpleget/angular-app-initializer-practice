import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-after-parent",
  templateUrl: `<p>parent</p><app-after-child></app-after-child>`
})
export class AfterParentComponent implements OnInit {
  constructor() {
    console.log('### AfterParentComponent constructor');
  }

  ngOnInit() {
    console.log('### AfterParentComponent ngOnInit');
  }
}
