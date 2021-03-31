import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonFilesComponent } from './button-files.component'
import { IconModule } from '../icon/icon.module'


@NgModule({
  declarations: [ButtonFilesComponent],
  exports: [
    ButtonFilesComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
  ],
})
export class ButtonFilesModule {}
