import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { FormValidators } from '../../helpers/form-validators'
import { AppStateInterface, OrderInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'
import { FormProgressService } from '../../shared/form-progress/form-progress.service'

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss']
})
export class PassportComponent implements OnInit {
  @Input() state: AppStateInterface

  order: OrderInterface
  form: FormGroup

  formProgressValue = 0

  constructor(
    private app: AppService,
    private formProgress: FormProgressService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.order = Object.assign({}, this.state.order)

    this.buildForm()
  }

  updateFormProgressValue(): void {
    let percent = 0
    if (this.serialNumberPassportControl.valid) {
      percent += this.formProgress.getFieldPercent('serialNumberPassport')
    }

    this.formProgressValue = percent
  }

  buildForm(): void {
    let serialNumberPassport = ''
    if (this.order) {
      serialNumberPassport = this.order.serialPassport + this.order.numberPassport
    }

    this.form = this.fb.group({
      serialNumberPassport: [serialNumberPassport, [FormValidators.required, FormValidators.passportSerialNumber]],
      datePassport: [],
      codePassport: [],
      wherePassport: [],
      placeBirthday: [],
      snils: [],
      changeLastnameFlag: [],
      prevLastname: [],
      stacPhone: [],
      liveRegFlag: []
      // addressReg
      // addressFact
    })
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) { return }

    console.log('submit', this.form.value)
  }

  get serialNumberPassportControl(): FormControl {
    return this.form.get('serialNumberPassport') as FormControl
  }
}
