import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'

import { PreloaderModule } from '../preloader/preloader.module'
import { InputAutocompleteComponent } from './input-autocomplete.component'

@NgModule({
  declarations: [InputAutocompleteComponent],
  exports: [
    InputAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    PreloaderModule,
  ],
})
export class InputAutocompleteModule {}
