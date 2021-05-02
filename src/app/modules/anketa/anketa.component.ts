import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { any } from 'codelyzer/util/function'
import { FormValidators } from '../../helpers/form-validators'
import { ABTestInterface, OrderInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'
import { AnketaFormInterface } from './anketa.model'

@Component({
  selector: 'app-anketa',
  templateUrl: './anketa.component.html',
  styleUrls: ['./anketa.component.scss']
})
export class AnketaComponent implements OnInit {
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>()

  order: OrderInterface
  form: FormGroup

  constructor(
    private app: AppService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm()
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) { return }

    this.submitted.emit(this.form.value)
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
