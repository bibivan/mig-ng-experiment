import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IconModule } from '../icon/icon.module'
import { RoundIconComponent } from './round-icon.component'


@NgModule({
  declarations: [RoundIconComponent],
  exports: [RoundIconComponent],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class RoundIconModule {
}
