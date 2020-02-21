import { Component, OnInit } from "@angular/core";
import { AfterService } from './after.service';

@Component({
  selector: "app-after-parent",
  template: `<p>parent</p><app-after-child></app-after-child>`
})
export class AfterParentComponent implements OnInit {
  constructor(
    private afterService: AfterService
  ) {
    console.log('### AfterParentComponent constructor');
  }

  ngOnInit() {
    console.log('### AfterParentComponent ngOnInit');
    console.log('### AfterParentComponent config', this.afterService._local_config);
    console.log('### AfterParentComponent updated', this.afterService._local_update);
    
  }
}
