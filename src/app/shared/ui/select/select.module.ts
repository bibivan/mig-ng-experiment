import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SelectComponent } from './select.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { ReactiveFormsModule } from '@angular/forms'
import { IconModule } from '../icon/icon.module'

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
