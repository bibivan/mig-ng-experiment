import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from './button.component'
import { IconModule } from '../icon/icon.module'


@NgModule({
  declarations: [ButtonComponent],
  exports: [
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
  ],
})
export class ButtonModule {}
