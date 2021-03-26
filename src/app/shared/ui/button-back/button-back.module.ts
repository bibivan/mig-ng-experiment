import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonBackComponent } from './button-back.component'
import { ButtonModule } from '../button/button.module'


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
