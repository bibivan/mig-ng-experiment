import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { any } from 'codelyzer/util/function'
import { FormValidators } from '../../helpers/form-validators'
import { clearMaskedValue } from '../../helpers/helper'
import { ApiService } from '../../services/api.service'
import {
  CheckPhoneRequestInterface,
  CheckPhoneResponseInterface,
  SaveAnketaRequestInterface
} from '../../services/app-api.model'
import { AppApiService } from '../../services/app-api.service'
import { ABTestInterface, AppStateInterface, OrderInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'
import { CalculatorService } from '../shared/calculator/calculator.service'
import { FormProgressService } from '../shared/form-progress/form-progress.service'
import { checkPhoneTemplateType } from './anketa.model'

@Component({
  selector: 'app-anketa',
  templateUrl: './anketa.component.html',
  styleUrls: ['./anketa.component.scss']
})
export class AnketaComponent implements OnInit {
  @Input() state: AppStateInterface

  order: OrderInterface
  form: FormGroup

  formProgressValue = 0

  isAvailableSubmit: boolean

  isOpenModalCheckPhone: boolean
  templateModalCheckPhone: checkPhoneTemplateType

  checkPhoneStatus: string
  checkPhonePromotions: boolean
  checkPhoneModalAvailableStatuses = ['107', '114']

  isOpenAcceptModal: boolean

  constructor(
    private app: AppService,
    private appApi: AppApiService,
    private calculator: CalculatorService,
    private formProgress: FormProgressService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.order = Object.assign({}, this.state.order)
    this.buildForm()

    this.form.valueChanges.subscribe(this.updateFormProgressValue.bind(this))
    this.updateFormProgressValue()

    this.mobilePhoneControl.valueChanges.subscribe(() => { this.isAvailableSubmit = false })
    this.checkPhone(this.mobilePhoneControl.value)
  }

  updateFormProgressValue(): void {
    let percent = 0
    if (this.mobilePhoneControl.valid) {
      percent += this.formProgress.getFieldPercent('mobilePhone')
    }

    if (this.lastnameControl.valid) {
      percent += this.formProgress.getFieldPercent('lastname')
    }

    if (this.nameControl.valid) {
      percent += this.formProgress.getFieldPercent('name')
    }

    if (this.patronymicControl.valid) {
      percent += this.formProgress.getFieldPercent('patronymic')
    }

    if (this.dateBirthdayControl.valid) {
      percent += this.formProgress.getFieldPercent('dateBirthday')
    }

    if (this.emailControl.valid) {
      percent += this.formProgress.getFieldPercent('email')
    }

    this.formProgressValue = percent
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
    })
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) { return }

    const data: SaveAnketaRequestInterface = Object.assign({},
      { ABTest: this.order.ABTest },
      this.calculator.getCalculatorValue(),
      this.form.value
    )
    this.app.saveAnketa(data)
  }

  checkPhone(phone: string): void {
    this.isAvailableSubmit = false

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
        this.checkPhonePromotions = data.promotions

        if (this.checkPhoneModalAvailableStatuses.includes(this.checkPhoneStatus)) {
          this.openModalCheckPhone()
        }

        this.updateAvailableSubmit()
      },
      () => this.openErrorModalCheckPhone()
    )
  }

  updateAvailableSubmit(): void {
    if (this.checkPhoneStatus === '1') {
      this.isAvailableSubmit = true
    } else {
      this.isAvailableSubmit = false
    }
  }

  openErrorModalCheckPhone(): void {
    this.checkPhoneStatus = null
    this.checkPhonePromotions = null
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

  openAcceptModal(event: any): void {
    event.preventDefault()
    this.isOpenAcceptModal = true
  }

  closeAcceptModal(): void {
    this.isOpenAcceptModal = false
  }

  onClickAuthButton(): void {
    console.log('auth')
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

}
