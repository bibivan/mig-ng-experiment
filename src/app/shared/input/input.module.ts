import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { NgxCurrencyModule } from 'ngx-currency'
import { NgxMaskModule } from 'ngx-mask'
import { IconModule } from '../icon/icon.module'
import { PreloaderModule } from '../preloader/preloader.module'
import { InputComponent } from './input.component'


@NgModule({
  declarations: [InputComponent],
  exports: [
    InputComponent
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    NgxCurrencyModule,
    PreloaderModule,
    IconModule
  ]
})
export class InputModule {
}
