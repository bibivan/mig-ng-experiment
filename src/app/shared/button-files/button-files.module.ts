import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IconModule } from '../icon/icon.module'
import { ButtonFilesComponent } from './button-files.component'


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
