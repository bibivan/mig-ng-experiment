import { registerLocaleData } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import localeRu from '@angular/common/locales/ru'
import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { NgxMaskModule } from 'ngx-mask'
import { environment } from '../environments/environment'
import { appInitializer } from './app-initializer'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { JwtInterceptor } from './interceptors/jwt.interceptor'
import { AuthenticationService } from './services/authentication.service'
import { ContainerModule } from './shared/container/container.module'
import { FormWrapperModule } from './shared/form-wrapper/form-wrapper.module'
import { HeaderModule } from './shared/header/header.module'
import { ModalModule } from './shared/modal/modal.module'
import { PreloaderModule } from './shared/preloader/preloader.module'
import { SectionModule } from './shared/section/section.module'
import { SharedModule } from './shared/shared.module'
import { ToastModule } from './shared/toast/toast.module'
import { AdditionalContactModule } from './steps/additional-contact/additional-contact.module'
import { AnketaModule } from './steps/anketa/anketa.module'
import { ContractModule } from './steps/contract/contract.module'
import { EmploymentAndIncomeModule } from './steps/employment-and-income/employment-and-income.module'
import { FinalModule } from './steps/final/final.module'
import { InsuranceInfoHintModule } from './steps/hints/insurance-info-hint/insurance-info-hint.module'
import { InsuranceTermHintModule } from './steps/hints/insurance-term-hint/insurance-term-hint.module'
import { PersonalAccountHintModule } from './steps/hints/personal-account-hint/personal-account-hint.module'
import { SumLoanHintModule } from './steps/hints/sum-loan-hint/sum-loan-hint.module'
import { HoldAmountModule } from './steps/hold-amount/hold-amount.module'
import { PassportModule } from './steps/passport/passport.module'
import { ProductsModule } from './steps/products/products.module'
import { RefusalLoanModule } from './steps/refusal-loan/refusal-loan.module'
import { SmsModule } from './steps/sms/sms.module'
import { SnilsModule } from './steps/snils/snils.module'
import { StepPreloaderModule } from './steps/step-preloader/step-preloader.module'

registerLocaleData(localeRu, 'ru')

@NgModule({
  declarations: [
    AppComponent,
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
    AdditionalContactModule,
    ProductsModule,
    ContractModule,
    InsuranceTermHintModule,
    InsuranceInfoHintModule,
    RefusalLoanModule,
    SumLoanHintModule,
    SnilsModule,
    HoldAmountModule
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
