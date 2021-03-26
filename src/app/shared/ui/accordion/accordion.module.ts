import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { IconModule } from '../icon/icon.module'
import { AccordionComponent } from './accordion.component'

@NgModule({
  declarations: [AccordionComponent],
  exports: [
    AccordionComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
  ],
})
export class AccordionModule {}
