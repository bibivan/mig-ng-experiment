import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
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
