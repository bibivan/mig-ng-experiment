import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SmsComponent } from './sms.component'


@NgModule({
  declarations: [
    SmsComponent
  ],
  exports: [
    SmsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SmsModule {}
