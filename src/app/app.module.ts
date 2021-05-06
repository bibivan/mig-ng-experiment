import { registerLocaleData } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxMaskModule } from 'ngx-mask'
import localeRu from '@angular/common/locales/ru'
import { appInitializer } from './app-initializer'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { JwtInterceptor } from './interceptors/jwt.interceptor'
import { ModalModule } from './shared/modal/modal.module'
import { AdditionalContactModule } from './steps/additional-contact/additional-contact.module'
import { AnketaModule } from './steps/anketa/anketa.module'
import { EmploymentAndIncomeModule } from './steps/employment-and-income/employment-and-income.module'
import { FinalModule } from './steps/final/final.module'
import { PersonalAccountHintModule } from './steps/hints/personal-account-hint/personal-account-hint.module'
import { PassportModule } from './steps/passport/passport.module'
import { HeaderModule } from './shared/header/header.module'
import { ContainerModule } from './shared/container/container.module'
import { SectionModule } from './shared/section/section.module'
import { FormWrapperModule } from './shared/form-wrapper/form-wrapper.module'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { PreloaderModule } from './shared/preloader/preloader.module'
import { SharedModule } from './shared/shared.module'
import { ToastModule } from './shared/toast/toast.module'
import { SmsModule } from './steps/sms/sms.module'
import { StepPreloaderModule } from './steps/step-preloader/step-preloader.module'
import { AuthenticationService } from './services/authentication.service'

registerLocaleData(localeRu, 'ru')

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContainerModule,
    HttpClientModule,
    AppRoutingModule,
    FormWrapperModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxMaskModule.forRoot(),
    HeaderModule,
    PreloaderModule,
    SectionModule,
    AnketaModule,
    StepPreloaderModule,
    SmsModule,
    FinalModule,
    PassportModule,
    ToastModule,
    SharedModule,
    ModalModule,
    PersonalAccountHintModule,
    EmploymentAndIncomeModule,
    AdditionalContactModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthenticationService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'RUB' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
