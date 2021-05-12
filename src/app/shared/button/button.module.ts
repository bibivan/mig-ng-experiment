import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IconModule } from '../icon/icon.module'
import { ButtonComponent } from './button.component'


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
