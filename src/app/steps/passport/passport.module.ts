import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { ContainerModule } from '../../shared/container/container.module'
import { FormProgressModule } from '../../shared/form-progress/form-progress.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { InputModule } from '../../shared/input/input.module'
import { SharedModule } from '../../shared/shared.module'
import { PassportComponent } from './passport.component';



@NgModule({
  declarations: [
    PassportComponent
  ],
  exports: [
    PassportComponent
  ],
  imports: [
    CommonModule,
    FormProgressModule,
    ContainerModule,
    FormWrapperModule,
    InputModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PassportModule { }
