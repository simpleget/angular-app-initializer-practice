import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { BeforeFirstComponent } from "./before/before.first.component";
import { BeforeSecondComponent } from "./before/before.second.component";
import { AfterComponent } from "./after/after.component";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    BeforeFirstComponent,
    BeforeSecondComponent,
    AfterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
