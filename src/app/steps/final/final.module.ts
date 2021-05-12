import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FinalComponent } from './final.component'


@NgModule({
  declarations: [
    FinalComponent
  ],
  exports: [
    FinalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FinalModule {}
