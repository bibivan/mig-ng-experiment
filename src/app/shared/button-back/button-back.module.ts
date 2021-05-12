import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ButtonModule } from '../button/button.module'
import { ButtonBackComponent } from './button-back.component'


@NgModule({
  declarations: [ButtonBackComponent],
  exports: [
    ButtonBackComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
  ],
})
export class ButtonBackModule {}
