import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ButtonTextComponent } from './button-text.component'


@NgModule({
  declarations: [ButtonTextComponent],
  exports: [
    ButtonTextComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ButtonTextModule {}
