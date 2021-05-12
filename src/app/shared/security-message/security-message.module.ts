import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IconModule } from '../icon/icon.module'
import { SecurityMessageComponent } from './security-message.component'


@NgModule({
  declarations: [
    SecurityMessageComponent
  ],
  exports: [
    SecurityMessageComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class SecurityMessageModule {}
