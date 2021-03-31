import { registerLocaleData } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { NgxMaskModule } from 'ngx-mask'
import localeRu from '@angular/common/locales/ru'
import { appInitializer } from './app-initializer'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { JwtInterceptor } from './interceptors/jwt.interceptor'
import { ContainerModule } from './modules/shared/layout/container/container.module'
import { FormWrapperModule } from './modules/shared/ui/form-wrapper/form-wrapper.module'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { AuthenticationService } from './services/authentication.service'

registerLocaleData(localeRu, 'ru')

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ContainerModule,
    HttpClientModule,
    AppRoutingModule,
    FormWrapperModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxMaskModule.forRoot()
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
