import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerModule } from '../../shared/container/container.module'
import { FormProgressModule } from '../../shared/form-progress/form-progress.module'
import { FormWrapperModule } from '../../shared/form-wrapper/form-wrapper.module'
import { EmploymentAndIncomeComponent } from './employment-and-income.component';



@NgModule({
  declarations: [
    EmploymentAndIncomeComponent
  ],
  exports: [
    EmploymentAndIncomeComponent
  ],
  imports: [
    CommonModule,
    FormProgressModule,
    ContainerModule,
    FormWrapperModule
  ]
})
export class EmploymentAndIncomeModule { }
