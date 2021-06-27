import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { environment } from '../../../environments/environment'
import { FormValidators } from '../../helpers/form-validators'
import { clearMaskedValue, openExternalLink } from '../../helpers/helper'
import {
  CheckPhoneRequestInterface,
  CheckPhoneResponseInterface,
  CheckPromoCodeResponseInterface,
  SaveAnketaRequestInterface
} from '../../services/api.model'
import { ApiService } from '../../services/api.service'
import { OrderInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'
import { CalculatorValueInterface } from '../../shared/calculator/calculator.model'
import { CalculatorService } from '../../shared/calculator/calculator.service'
import { FormProgressService } from '../../shared/form-progress/form-progress.service'
import { checkPhoneTemplateType } from './anketa.model'

@Component({
  selector: 'app-anketa',
  templateUrl: './anketa.component.html',
  styleUrls: ['./anketa.component.scss']
})
export class AnketaComponent implements OnInit {
  @Input() order!: OrderInterface | null

  form!: FormGroup
  calculatorDefaultValue!: CalculatorValueInterface

  formProgressValue = 0

  isVerifiedMobilePhone: boolean = false

  isOpenModalCheckPhone: boolean = false
  templateModalCheckPhone!: checkPhoneTemplateType

  checkPhoneStatus: string = ''
  checkPhonePromotions: boolean = false
  checkPhoneModalAvailableStatuses = ['107', '114']

  isLoadingPromoCode: boolean = false
  promoCodeError: string = ''

  isOpenAcceptModal: boolean = false

  constructor(
    private app: AppService,
    private appApi: ApiService,
    private calculator: CalculatorService,
    private formProgress: FormProgressService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm()

    this.form.valueChanges.subscribe(this.updateFormProgressValue.bind(this))
    this.updateFormProgressValue()

    this.mobilePhoneControl.valueChanges.subscribe(() => { this.isVerifiedMobilePhone = false })
    this.checkPhone(this.mobilePhoneControl.value)

    if (this.order) {
      this.calculatorDefaultValue = {
        sum: this.order.sum || 5000,
        term: {
          value: this.order.term?.value || 10,
          termUnit: this.order.term?.termUnit || 'Day'
        }
      }
    }

    document.body.scrollTop = 0
  }

  buildForm(): void {
    this.form = this.fb.group({
      mobilePhone: [this.order?.mobilePhone, [FormValidators.required, FormValidators.mobilePhone]],
      lastname: [this.order?.lastname, [FormValidators.required, FormValidators.textRus]],
      name: [this.order?.name, [FormValidators.required, FormValidators.textRus]],
      patronymic: [this.order?.patronymic, [FormValidators.textRus]],
      dateBirthday: [this.order?.dateBirthday, [FormValidators.required, FormValidators.dateBirthday]],
      email: [this.order?.email, [FormValidators.required, FormValidators.email]],
      bankrupt: [true],
      accept: [true, [FormValidators.requiredCheckbox]],
      cessionAllowed: [true],
      promoCode: []
    })
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) { return }

    const data: SaveAnketaRequestInterface = Object.assign({},
      { ABTest: this.order?.ABTest },
      this.calculator.getCalculatorValue(),
      this.form.value
    )
    this.app.saveAnketa(data)
  }

  updateFormProgressValue(): void {
    const fields = [
      { control: this.mobilePhoneControl, id: 'mobilePhone' },
      { control: this.lastnameControl, id: 'lastname' },
      { control: this.nameControl, id: 'name' },
      { control: this.patronymicControl, id: 'patronymic' },
      { control: this.dateBirthdayControl, id: 'dateBirthday' },
      { control: this.emailControl, id: 'email' },
    ]

    this.formProgressValue = this.formProgress.getFormStepPercent(fields)
  }

  checkPhone(phone: string): void {
    this.isVerifiedMobilePhone = false

    if (this.mobilePhoneControl.invalid) {
      return
    }

    const body: CheckPhoneRequestInterface = {
      phone: clearMaskedValue(phone)
    }
    this.appApi.checkPhone(body).subscribe(
      (data: CheckPhoneResponseInterface) => {
        if (!data) {
          this.openErrorModalCheckPhone()
          return
        }

        this.checkPhoneStatus = data.order.status
        this.checkPhonePromotions = !!data.promotions

        if (this.checkPhoneModalAvailableStatuses.includes(this.checkPhoneStatus)) {
          this.openModalCheckPhone()
        }

        this.updateAvailableSubmit()
      },
      () => this.openErrorModalCheckPhone()
    )
  }

  checkPromoCode(): void {
    const promoCode = this.promoCodeControl.value
    this.promoCodeError = ''

    if (promoCode === '') {
      this.isLoadingPromoCode = false
      return
    }

    this.isLoadingPromoCode = true

    const sum = this.calculator.getCalculatorValue().sum || 0
    const body = { promoCode, sum }

    this.appApi.checkPromoCode(body).subscribe(
      (data: CheckPromoCodeResponseInterface) => {
        this.isLoadingPromoCode = false
        this.promoCodeError = data?.errorText || ''
        if (this.promoCodeError) {
          this.promoCodeControl.setValue('')
          this.promoCodeControl.markAsUntouched()
        }
      },
      () => {
        this.isLoadingPromoCode = false
        this.promoCodeError = 'Ошибка проверки промокода, повторите ввод'
      }
    )
  }

  onFocusPromoCode(): void {
    this.promoCodeError = ''
  }

  updateAvailableSubmit(): void {
    if (this.checkPhoneStatus === '1') {
      this.isVerifiedMobilePhone = true
    } else {
      this.isVerifiedMobilePhone = false
    }
  }

  openErrorModalCheckPhone(): void {
    this.checkPhoneStatus = ''
    this.checkPhonePromotions = false
    this.openModalCheckPhone()
  }

  openModalCheckPhone(): void {
    let template = 'error'

    if (this.checkPhoneModalAvailableStatuses.includes(this.checkPhoneStatus)) {
      if (this.checkPhonePromotions) {
        template = 'promotions'
      } else if (this.checkPhoneStatus === '107') {
        template = 'unfinishedApplication'
      } else if (this.checkPhoneStatus === '114') {
        template = 'activeCurrentAccount'
      }
    }

    this.templateModalCheckPhone = template as checkPhoneTemplateType
    this.isOpenModalCheckPhone = true
  }

  closeModalCheckPhone(): void {
    this.isOpenModalCheckPhone = false
  }

  openAcceptModal(event: MouseEvent): void {
    event.preventDefault()
    this.isOpenAcceptModal = true
  }

  closeAcceptModal(): void {
    this.isOpenAcceptModal = false
  }

  onClickAuthButton(): void {
    const siteUrl = environment.siteUrl
    const mobilePhone = clearMaskedValue(this.mobilePhoneControl.value)
    openExternalLink(`${ siteUrl }/login?login=${ mobilePhone }`, '_self')
  }

  get mobilePhoneControl(): FormControl {
    return this.form.get('mobilePhone') as FormControl
  }

  get lastnameControl(): FormControl {
    return this.form.get('lastname') as FormControl
  }

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl
  }

  get patronymicControl(): FormControl {
    return this.form.get('patronymic') as FormControl
  }

  get dateBirthdayControl(): FormControl {
    return this.form.get('dateBirthday') as FormControl
  }

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl
  }

  get bankruptControl(): FormControl {
    return this.form.get('bankrupt') as FormControl
  }

  get acceptControl(): FormControl {
    return this.form.get('accept') as FormControl
  }

  get cessionAllowedControl(): FormControl {
    return this.form.get('cessionAllowed') as FormControl
  }

  get promoCodeControl(): FormControl {
    return this.form.get('promoCode') as FormControl
  }
}
