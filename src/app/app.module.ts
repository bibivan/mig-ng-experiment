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
import {ModalModule} from "./shared/layout/modal/modal.module";
import {ButtonModule} from "./shared/ui/button/button.module";
import {ButtonTextModule} from "./shared/ui/button-text/button-text.module";
import {ButtonFilesModule} from "./shared/ui/button-files/button-files.module";
import {SectionModule} from "./shared/layout/section/section.module";
import {InputCodeModule} from "./shared/ui/input-code/input-code.module";
import {AccordionModule} from "./shared/ui/accordion/accordion.module";
import {ButtonBackModule} from "./shared/ui/button-back/button-back.module";
import {PreloaderModule} from "./shared/ui/preloader/preloader.module";
import {StepPreloaderModule} from "./modules/step-preloader/step-preloader.module";
import {InputAutocompleteModule} from "./shared/ui/input-autocomplete/input-autocomplete.module";
import {SelectModule} from "./shared/ui/select/select.module";
import {TextareaModule} from "./shared/ui/textarea/textarea.module";
import {RoundIconModule} from "./shared/ui/round-icon/round-icon.module";
import {InputRadioModule} from "./shared/ui/input-radio/input-radio.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    CalculatorModule,
    ModalModule,
    ButtonModule,
    ButtonTextModule,
    ButtonFilesModule,
    SectionModule,
    InputCodeModule,
    AccordionModule,
    ButtonBackModule,
    PreloaderModule,
    StepPreloaderModule,
    InputAutocompleteModule,
    SelectModule,
    TextareaModule,
    RoundIconModule,
    InputRadioModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
