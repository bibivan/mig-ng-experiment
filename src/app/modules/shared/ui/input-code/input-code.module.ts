import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputCodeComponent } from './input-code.component'
import { CodeInputModule } from 'angular-code-input'


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
