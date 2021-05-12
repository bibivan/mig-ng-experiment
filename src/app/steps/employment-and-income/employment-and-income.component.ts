import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { ClassificatorSelectOptions } from '../../helpers/classificator-select-options'
import { ClassificatorValidateRules } from '../../helpers/classificator-validate-rules'
import { FormValidators } from '../../helpers/form-validators'
import { isAvailableWorkBlock } from '../../helpers/helper'
import { SaveEmploymentAndIncomeRequestInterface } from '../../services/app-api.model'
import { OrderInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'
import { FormProgressService } from '../../shared/form-progress/form-progress.service'
import { selectOptionsType } from '../../shared/select/select.model'

@Component({
  selector: 'app-employment-and-income',
  templateUrl: './employment-and-income.component.html',
  styleUrls: ['./employment-and-income.component.scss']
})
export class EmploymentAndIncomeComponent implements OnInit {
  @Input() order: OrderInterface

  form: FormGroup
  formProgressValue = 0

  typeWorkOptions: selectOptionsType = ClassificatorSelectOptions.typeWork
  isAvailableWorkBlock: boolean

  constructor(
    private app: AppService,
    private formProgress: FormProgressService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm()

    this.form.valueChanges.subscribe(this.updateFormProgressValue.bind(this))
    this.typeWorkControl.valueChanges.subscribe(this.toggleWorkBlock.bind(this))

    this.updateFormProgressValue()
  }

  buildForm(): void {
    this.form = this.fb.group({
      typeWork: [this.order?.typeWork, [FormValidators.required]],
      companyName: [this.order?.companyName],
      workPhone: [this.order?.workPhone],
      companyStart: [this.order?.companyStart],
      incomeWork: [this.order?.incomeWork],
      paymentCredit: [this.order?.paymentCredit]
    })

    this.toggleWorkBlock()
  }

  submit(): void {
    this.form.markAllAsTouched()

    if (this.form.invalid) { return }

    this.app.saveEmploymentAndIncome(this.serializeForm())
  }

  updateFormProgressValue(): void {
    const fields = [
      { control: this.typeWorkControl, id: 'typeWork' },
      { control: this.companyNameControl, id: 'companyName' },
      { control: this.workPhoneControl, id: 'workPhone' },
      { control: this.companyStartControl, id: 'companyStart' },
      { control: this.incomeWorkControl, id: 'incomeWork' },
      { control: this.paymentCreditControl, id: 'paymentCredit' },
    ]

    this.formProgressValue = this.formProgress.getFormStepPercent(fields)
  }

  onClickBackButton(): void {
    this.app.updateOrder(this.serializeForm())
    this.app.setPage('passport')
  }

  private serializeForm(): SaveEmploymentAndIncomeRequestInterface {
    return this.form.value
  }

  private toggleWorkBlock(): void {
    this.isAvailableWorkBlock = isAvailableWorkBlock(this.typeWorkControl.value)

    this.updateValidateWorkGroup()
    this.updateValidateCompanyStart()
  }

  private updateValidateCompanyStart(): void {
    const dateBirthdayControl = new FormControl(this.order.dateBirthday)
    let validators = null
    if (this.isAvailableWorkBlock) {
      validators = [FormValidators.required, FormValidators.dateWorkStart(dateBirthdayControl)]
    }

    this.companyStartControl.setValidators(validators)
  }

  private updateValidateWorkGroup(): void {
    const validators = ClassificatorValidateRules.workBlock(!this.isAvailableWorkBlock)
    const workFields = ['companyName', 'workPhone', 'companyStart', 'incomeWork', 'paymentCredit']

    workFields.forEach((item: string) => {
      this.form.get(item).setValidators(validators[item])
      this.form.get(item).updateValueAndValidity()
    })

  }

  get typeWorkControl(): FormControl {
    return this.form.get('typeWork') as FormControl
  }

  get companyNameControl(): FormControl {
    return this.form.get('companyName') as FormControl
  }

  get companyStartControl(): FormControl {
    return this.form.get('companyStart') as FormControl
  }

  get workPhoneControl(): FormControl {
    return this.form.get('workPhone') as FormControl
  }

  get incomeWorkControl(): FormControl {
    return this.form.get('incomeWork') as FormControl
  }

  get paymentCreditControl(): FormControl {
    return this.form.get('paymentCredit') as FormControl
  }
}
