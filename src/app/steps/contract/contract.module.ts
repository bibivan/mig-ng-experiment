import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';



@NgModule({
  declarations: [
    ContractComponent
  ],
  exports: [
    ContractComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ContractModule { }
