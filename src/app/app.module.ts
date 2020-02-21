import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { BeforeParentComponent } from "./before/before.parent.component";
import { BeforeSecondComponent } from "./before/before.second.component";
import { AfterComponent } from "./after/after.component";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    BeforeParentComponent,
    BeforeSecondComponent,
    AfterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
