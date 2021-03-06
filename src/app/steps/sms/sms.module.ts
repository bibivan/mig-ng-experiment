import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AccordionModule } from '../../shared/accordion/accordion.module'
import { ButtonBackModule } from '../../shared/button-back/button-back.module'
import { ButtonFilesModule } from '../../shared/button-files/button-files.module'
import { ContainerModule } from '../../shared/container/container.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { InputCodeModule } from '../../shared/input-code/input-code.module'
import { SectionModule } from '../../shared/section/section.module'
import { SharedModule } from '../../shared/shared.module'
import { ToastModule } from '../../shared/toast/toast.module'
import { SmsComponent } from './sms.component'


@NgModule({
  declarations: [
    SmsComponent
  ],
  exports: [
    SmsComponent
  ],
  imports: [
    CommonModule,
    SectionModule,
    ContainerModule,
    FormWrapperModule,
    ButtonBackModule,
    ButtonFilesModule,
    AccordionModule,
    InputCodeModule,
    SharedModule,
    ToastModule
  ]
})
export class SmsModule {}
