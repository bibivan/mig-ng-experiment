import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CodeInputModule } from 'angular-code-input'
import { InputCodeComponent } from './input-code.component'


@NgModule({
  declarations: [InputCodeComponent],
  exports: [
    InputCodeComponent,
  ],
  imports: [
    CommonModule,
    CodeInputModule,
  ],
})
export class InputCodeModule {}
