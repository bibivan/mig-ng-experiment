import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { EMPTY, Observable } from 'rxjs'
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators'
import { autocompleteListType } from '../input-autocomplete/input-autocomplete.model'
import { selectOptionsType } from '../select/select.model'
import { KladrAddressInterface, kladrAddressType } from './kladr-address.model'
import { KladrAddressService } from './kladr-address.service'

@Component({
  selector: 'app-kladr-address',
  templateUrl: './kladr-address.component.html',
  styleUrls: ['./kladr-address.component.scss']
})
export class KladrAddressComponent implements OnInit, OnChanges {
  @Input() type!: kladrAddressType
  @Input() address: KladrAddressInterface | undefined = {
    type: null,
    region: '',
    punkt: '',
    punktCode: '',
    street: '',
    streetCode: '',
    home: '',
    flat: '',
    korp: '',
    str: '',
  }
  @Input() touched: number = 0
  @Output() changed: EventEmitter<KladrAddressInterface> = new EventEmitter<KladrAddressInterface>()

  regionOptions!: selectOptionsType
  punktList: autocompleteListType = []
  streetList: autocompleteListType = []

  isLoadingPunktList!: boolean
  isLoadingStreetList!: boolean

  form!: FormGroup

  constructor(
    private kladrAddress: KladrAddressService,
  ) {}

  ngOnInit(): void {
    this.regionOptions = this.kladrAddress.regions

    this.form = this.kladrAddress.getKladrFormGroup(this.type)
    this.setAddressValues()

    this.initAutocomplete()

    this.regionControl.valueChanges.subscribe(this.onSelectRegion.bind(this))
    this.form.valueChanges.subscribe(this.onValueChangesForm.bind(this))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.touched?.currentValue) {
      this.form.markAllAsTouched()
    }
  }

  onSelectRegion(): void {
    const region = this.regionControl.value
    let punktValue = ''
    let punktCodeValue = ''
    if (region === '7700000000000') {
      punktValue = 'Город Москва'
      punktCodeValue = '7700000000000,7700000000000'
    }
    if (region === '7800000000000') {
      punktValue = 'Город Санкт-Петербург'
      punktCodeValue = '7800000000000,7800000000000'
    }

    this.punktControl.setValue(punktValue)
    this.punktCodeControl.setValue(punktCodeValue)
    this.punktControl.enable()
    this.punktControl.markAsUntouched()
    this.punktCodeControl.markAsUntouched()
  }

  private onValueChangesForm(data: KladrAddressInterface): void {
    this.changed.emit(data)
  }

  private searchPunktCode(): void {
    if (!this.regionControl.value) {
      this.punktControl.markAsUntouched()
      return
    }

    const code = this.getKladrCode(this.punktControl.value, this.punktList)

    this.streetControl.setValue('')
    this.streetCodeControl.setValue('')

    if (code === '') {
      this.streetControl.disable()
    } else {
      this.streetControl.enable()
    }

    this.punktCodeControl.setValue(code)

    this.streetControl.markAsUntouched()
    this.streetCodeControl.markAsUntouched()

  }

  private searchStreetCode(): void {
    const code = this.getKladrCode(this.streetControl.value, this.streetList)

    this.streetCodeControl.setValue(code)
  }

  private initAutocomplete(): void {
    this.punktControl.valueChanges
      .pipe(
        debounceTime(400),
        tap(() => {
          this.punktList = []
          this.isLoadingPunktList = true
          this.searchPunktCode()
        }),
        switchMap(value => this.getCity(value)
          .pipe(
            finalize(() => {
              this.isLoadingPunktList = false
            }),
          ),
        ),
      )
      .subscribe(
        (data: autocompleteListType) => {
          this.punktList = data
          this.searchPunktCode()
        },
      )

    this.streetControl.valueChanges
      .pipe(
        debounceTime(400),
        tap(() => {
          this.streetList = []
          this.isLoadingStreetList = true
          this.searchStreetCode()
        }),
        switchMap(value => this.getStreet(value)
          .pipe(
            finalize(() => {
              this.isLoadingStreetList = false
            }),
          ),
        ),
      )
      .subscribe(
        (data: autocompleteListType) => {
          this.streetList = data
          this.searchStreetCode()
        },
      )
  }

  private setAddressValues(): void {
    if (!this.address) {
      this.punktControl.disable()
      this.streetControl.disable()
      this.punktControl.markAsUntouched()
      this.streetControl.markAsUntouched()

      return
    }

    const {
      type = '',
      region = '',
      punkt = '',
      punktCode = '',
      street = '',
      streetCode = '',
      home = '',
      flat = '',
      korp = '',
      str = '',
    } = this.address

    this.form.get('type')?.setValue(type)
    this.regionControl.setValue(region)
    this.punktControl.setValue(punkt)
    this.punktCodeControl.setValue(punktCode)
    this.streetControl.setValue(street)
    this.streetCodeControl.setValue(streetCode)
    this.homeControl.setValue(home)
    this.flatControl.setValue(flat)
    this.korpControl.setValue(korp)
    this.strControl.setValue(str)

    if (!region) {
      this.punktControl.disable()
      this.punktControl.setValue('')
      this.punktCodeControl.setValue('')
      this.streetControl.disable()
      this.streetControl.setValue('')
      this.streetCodeControl.setValue('')
      return
    }

    if (!punkt) {
      this.streetControl.disable()
      this.streetControl.setValue('')
      this.streetCodeControl.setValue('')
    }
  }

  private getCity(text: string): Observable<autocompleteListType> {
    if (!text) {
      return EMPTY
    }
    return this.kladrAddress.getCity(this.regionControl.value, text)
  }

  private getStreet(text: string): Observable<autocompleteListType> {
    this.streetList = []

    if (!text) {
      return EMPTY
    }

    const region = this.regionControl.value
    const punkt = this.punktCodeControl.value

    return this.kladrAddress.getStreet(region, punkt, text)
  }

  private getKladrCode(text: string, list: autocompleteListType): string {
    const searchItem = list.filter((item) => item.name === text)

    let code = ''
    if (searchItem.length) {
      code = searchItem[0].value
    }

    return code
  }

  get regionControl(): FormControl {
    return this.form.get('region') as FormControl
  }

  get punktControl(): FormControl {
    return this.form.get('punkt') as FormControl
  }

  get punktCodeControl(): FormControl {
    return this.form.get('punktCode') as FormControl
  }

  get streetControl(): FormControl {
    return this.form.get('street') as FormControl
  }

  get streetCodeControl(): FormControl {
    return this.form.get('streetCode') as FormControl
  }

  get homeControl(): FormControl {
    return this.form.get('home') as FormControl
  }

  get flatControl(): FormControl {
    return this.form.get('flat') as FormControl
  }

  get korpControl(): FormControl {
    return this.form.get('korp') as FormControl
  }

  get strControl(): FormControl {
    return this.form.get('str') as FormControl
  }

}
