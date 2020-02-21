import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { BeforeParentComponent } from "./before/before.parent.component";
import { BeforeChildComponent } from "./before/before.child.component";
import { AfterComponent } from "./after/after.component";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    BeforeParentComponent,
    BeforeChildComponent,
    AfterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
