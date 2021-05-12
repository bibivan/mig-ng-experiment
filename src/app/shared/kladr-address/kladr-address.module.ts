import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { InputAutocompleteModule } from '../input-autocomplete/input-autocomplete.module'
import { InputModule } from '../input/input.module'
import { SelectModule } from '../select/select.module'
import { SharedModule } from '../shared.module'
import { KladrAddressComponent } from './kladr-address.component'


@NgModule({
  declarations: [
    KladrAddressComponent
  ],
  exports: [
    KladrAddressComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    SharedModule,
    InputAutocompleteModule,
    SelectModule,
    ReactiveFormsModule
  ]
})
export class KladrAddressModule {}
