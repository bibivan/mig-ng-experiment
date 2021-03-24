import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ContainerModule} from "./shared/layout/container/container.module";
import {FormWrapperModule} from "./shared/ui/form-wrapper/form-wrapper.module";
import {InputModule} from "./shared/ui/input/input.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ContainerModule,
    AppRoutingModule,
    FormWrapperModule,
    InputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
