import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ButtonModule } from '../../../shared/button/button.module'
import { SnilsHintComponent } from './snils-hint.component'


@NgModule({
  declarations: [
    SnilsHintComponent
  ],
  exports: [
    SnilsHintComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class SnilsHintModule {}
