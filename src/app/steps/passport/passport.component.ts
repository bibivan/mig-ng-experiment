import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { ClassificatorSelectOptions } from '../../helpers/classificator-select-options'
import { ClassificatorValidateRules } from '../../helpers/classificator-validate-rules'
import { FormValidators } from '../../helpers/form-validators'
import { getGenderByFIO, getSerialAndNumberPassport } from '../../helpers/helper'
import { SavePassportRequestInterface } from '../../services/app-api.model'
import { AppStateInterface, OrderInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'
import { FormProgressService } from '../../shared/form-progress/form-progress.service'
import { KladrAddressInterface } from '../../shared/kladr-address/kladr-address.model'
import { KladrAddressService } from '../../shared/kladr-address/kladr-address.service'

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss']
})
export class PassportComponent implements OnInit {
  @Input() order: OrderInterface

  form: FormGroup
  formTouched = 0
  formProgressValue = 0

  isOpenSnilsModal: boolean

  constructor(
    private app: AppService,
    private formProgress: FormProgressService,
    private fb: FormBuilder,
    private kladrAddress: KladrAddressService
  ) { }

  ngOnInit(): void {
    this.buildForm()

    this.liveRegFlagControl.valueChanges.subscribe(this.toggleLiveRegFlag.bind(this))

    this.form.valueChanges.subscribe(this.updateFormProgressValue.bind(this))
    this.updateFormProgressValue()

    document.body.scrollTop = 0
  }

  buildForm(): void {
    let serialNumberPassport = ''
    if (this.order) {
      serialNumberPassport = this.order.serialPassport + this.order.numberPassport
    }

    this.form = this.fb.group({
      serialNumberPassport: [serialNumberPassport, [FormValidators.required, FormValidators.passportSerialNumber]],
      datePassport: [this.order?.datePassport],
      codePassport: [this.order?.codePassport, [FormValidators.required, FormValidators.passportCode]],
      wherePassport: [this.order?.wherePassport, [FormValidators.required, FormValidators.noneEnglish]],
      placeBirthday: [this.order?.placeBirthday, [FormValidators.required]],
      snils: [this.order?.snils, [FormValidators.required, FormValidators.snils]],
      changeLastnameFlag: [false],
      prevLastname: [this.order?.prevLastname, [FormValidators.textRus]],
      stacPhone: [this.order?.stacPhone],
      liveRegFlag: [this.order?.liveRegFlag],
      address: this.fb.group({
        Registration: this.kladrAddress.getKladrFormGroup('Registration'),
        Fact: this.kladrAddress.getKladrFormGroup('Fact'),
      }),
      sex: [],
      mobilePhone: [this.order?.mobilePhone],
      dateBirthday: [this.order?.dateBirthday]
    })

    this.saveSex()

    const address = this.order?.address
    if (address) {
      this.saveKladrAddress(address.Fact)
      this.saveKladrAddress(address.Registration)
    }

    this.toggleLiveRegFlag()
    this.updateValidateDatePassport()
    this.updateValidateStacPhone()
  }

  submit(): void {
    this.form.markAllAsTouched()
    this.formTouched++

    if (this.form.invalid) { return }

    this.app.savePassport(this.serializeForm())
  }

  updateFormProgressValue(): void {
    const fields = [
      { control: this.serialNumberPassportControl, id: 'serialNumberPassport' },
      { control: this.datePassportControl, id: 'datePassport' },
      { control: this.codePassportControl, id: 'codePassport' },
      { control: this.wherePassportControl, id: 'wherePassport' },
      { control: this.placeBirthdayControl, id: 'placeBirthday' },
      { control: this.snilsControl, id: 'snils' },
      { control: this.prevLastnameControl, id: 'prevLastname' },
      { control: this.stacPhoneControl, id: 'stacPhone' },
      { control: this.addressRegistrationGroup.get('region') as FormControl, id: 'addressRegistrationRegion' },
      { control: this.addressRegistrationGroup.get('punkt') as FormControl, id: 'addressRegistrationPunkt' },
      { control: this.addressRegistrationGroup.get('punktCode') as FormControl, id: 'addressRegistrationPunktCode' },
      { control: this.addressRegistrationGroup.get('street') as FormControl, id: 'addressRegistrationStreet' },
      { control: this.addressRegistrationGroup.get('streetCode') as FormControl, id: 'addressRegistrationStreetCode' },
      { control: this.addressRegistrationGroup.get('home') as FormControl, id: 'addressRegistrationHome' },
      { control: this.addressRegistrationGroup.get('flat') as FormControl, id: 'addressRegistrationFlat' },
      { control: this.addressRegistrationGroup.get('korp') as FormControl, id: 'addressRegistrationKorp' },
      { control: this.addressRegistrationGroup.get('str') as FormControl, id: 'addressRegistrationStr' },
      { control: this.addressFactGroup.get('region') as FormControl, id: 'addressFactRegion' },
      { control: this.addressFactGroup.get('punkt') as FormControl, id: 'addressFactPunkt' },
      { control: this.addressFactGroup.get('punktCode') as FormControl, id: 'addressFactPunktCode' },
      { control: this.addressFactGroup.get('street') as FormControl, id: 'addressFactStreet' },
      { control: this.addressFactGroup.get('streetCode') as FormControl, id: 'addressFactStreetCode' },
      { control: this.addressFactGroup.get('home') as FormControl, id: 'addressFactHome' },
      { control: this.addressFactGroup.get('flat') as FormControl, id: 'addressFactFlat' },
      { control: this.addressFactGroup.get('korp') as FormControl, id: 'addressFactKorp' },
      { control: this.addressFactGroup.get('str') as FormControl, id: 'addressFactStr' },
    ]

    this.formProgressValue = this.formProgress.getFormStepPercent(fields)
  }

  saveKladrAddress(data: KladrAddressInterface): void {
    if (!data) {
      return
    }

    let addressData: FormGroup
    if (data.type === 'Fact') {
      addressData = this.addressFactGroup
    } else if (data.type === 'Registration') {
      addressData = this.addressRegistrationGroup
    }

    this.kladrAddress.setKladrAddressValues(addressData, data)
  }

  openSnilsModal(): void {
    this.isOpenSnilsModal = true
  }

  closeSnilsModal(): void {
    this.isOpenSnilsModal = false
  }

  private serializeForm(): SavePassportRequestInterface {
    const serialNumberPassport = getSerialAndNumberPassport(this.serialNumberPassportControl.value)
    const numberPassport = serialNumberPassport.numberPassport
    const serialPassport = serialNumberPassport.serialPassport

    const result: SavePassportRequestInterface = {
      address: {
        Registration: this.addressRegistrationGroup.value,
        Fact: this.addressFactGroup.value,
      },
      codePassport: this.codePassportControl.value,
      datePassport: this.datePassportControl.value,
      liveRegFlag: this.liveRegFlagControl.value,
      numberPassport,
      placeBirthday: this.placeBirthdayControl.value,
      prevLastname: this.prevLastnameControl.value,
      serialPassport,
      snils: this.snilsControl.value,
      stacPhone: this.stacPhoneControl.value,
      wherePassport: this.wherePassportControl.value,
    }
    return result
  }

  private updateValidateStacPhone(): void {
    this.stacPhoneControl.setValidators([
      FormValidators.required,
      FormValidators.stacPhone(this.mobilePhoneControl)
    ])

    this.stacPhoneControl.updateValueAndValidity()
  }

  private updateValidateDatePassport(): void {
    this.datePassportControl.setValidators([FormValidators.required, FormValidators.datePassport(this.dateBirthdayControl)])
    this.datePassportControl.updateValueAndValidity()
  }

  private toggleLiveRegFlag(): void {
    const validators = ClassificatorValidateRules.kladrAddress(this.liveRegFlagControl.value)

    const addressFields = this.kladrAddress.getKladrFields()

    addressFields.forEach((item: string) => {
      this.addressRegistrationGroup.get(item).setValidators(validators[item])
      this.addressRegistrationGroup.get(item).updateValueAndValidity()
    })
  }

  private saveSex(): void {
    const sex = getGenderByFIO(this.order?.lastname, this.order?.name, this.order?.patronymic)
    this.sexControl.setValue(sex)
  }

  get serialNumberPassportControl(): FormControl {
    return this.form.get('serialNumberPassport') as FormControl
  }

  get datePassportControl(): FormControl {
    return this.form.get('datePassport') as FormControl
  }

  get codePassportControl(): FormControl {
    return this.form.get('codePassport') as FormControl
  }

  get wherePassportControl(): FormControl {
    return this.form.get('wherePassport') as FormControl
  }

  get placeBirthdayControl(): FormControl {
    return this.form.get('placeBirthday') as FormControl
  }

  get snilsControl(): FormControl {
    return this.form.get('snils') as FormControl
  }

  get changeLastnameFlagControl(): FormControl {
    return this.form.get('changeLastnameFlag') as FormControl
  }

  get prevLastnameControl(): FormControl {
    return this.form.get('prevLastname') as FormControl
  }

  get stacPhoneControl(): FormControl {
    return this.form.get('stacPhone') as FormControl
  }

  get addressFactGroup(): FormGroup {
    return this.form.get('address').get('Fact') as FormGroup
  }

  get addressRegistrationGroup(): FormGroup {
    return this.form.get('address').get('Registration') as FormGroup
  }

  get liveRegFlagControl(): FormControl {
    return this.form.get('liveRegFlag') as FormControl
  }

  get sexControl(): FormControl {
    return this.form.get('sex') as FormControl
  }

  get mobilePhoneControl(): FormControl {
    return this.form.get('mobilePhone') as FormControl
  }

  get dateBirthdayControl(): FormControl {
    return this.form.get('dateBirthday') as FormControl
  }
}
