import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ButtonModule } from '../button/button.module'
import { ContainerModule } from '../container/container.module'

import { IconModule } from '../icon/icon.module'
import { SectionModule } from '../section/section.module'
import { ModalComponent } from './modal.component'

@NgModule({
  declarations: [ModalComponent],
  exports: [
    ModalComponent,
  ],
  imports: [
    CommonModule,
    SectionModule,
    ContainerModule,
    IconModule,
    ButtonModule,
  ],
})
export class ModalModule {}
