import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerModule } from '../shared/container/container.module'
import { HeaderComponent } from './header.component';



@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ContainerModule
  ]
})
export class HeaderModule { }
