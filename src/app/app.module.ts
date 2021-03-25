import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContainerModule} from "./shared/layout/container/container.module";
import {FormWrapperModule} from "./shared/ui/form-wrapper/form-wrapper.module";
import {InputModule} from "./shared/ui/input/input.module";
import {InputCheckboxModule} from "./shared/ui/input-checkbox/input-checkbox.module";
import {FormProgressModule} from "./modules/form-progress/form-progress.module";
import {InputSliderModule} from "./shared/ui/input-slider/input-slider.module";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {CalculatorModule} from "./modules/calculator/calculator.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ContainerModule,
    AppRoutingModule,
    FormWrapperModule,
    InputModule,
    InputCheckboxModule,
    InputSliderModule,
    FormProgressModule,
    NoopAnimationsModule,
    CalculatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
