import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { IconModule } from '../icon/icon.module'
import { SelectComponent } from './select.component'

@NgModule({
  declarations: [SelectComponent],
  exports: [
    SelectComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    IconModule,
  ],
})
export class SelectModule {}
