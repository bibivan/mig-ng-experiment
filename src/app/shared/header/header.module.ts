import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ContainerModule } from '../container/container.module'
import { HeaderComponent } from './header.component'


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
export class HeaderModule {}
