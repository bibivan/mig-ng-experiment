import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { ClassificatorSelectOptions } from '../../helpers/classificator-select-options'
import { FormValidators } from '../../helpers/form-validators'
import { SaveAdditionalContactRequestInterface } from '../../services/app-api.model'
import { AppStateInterface, OrderInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'
import { FormProgressService } from '../../shared/form-progress/form-progress.service'
import { selectOptionsType } from '../../shared/select/select.model'

@Component({
  selector: 'app-additional-contact',
  templateUrl: './additional-contact.component.html',
  styleUrls: ['./additional-contact.component.scss']
})
export class AdditionalContactComponent implements OnInit {
  @Input() order: OrderInterface

  form: FormGroup
  formProgressValue = 0

  contactsStatusOptions: selectOptionsType = ClassificatorSelectOptions.getContactsStatus(true)

  constructor(
    private app: AppService,
    private formProgress: FormProgressService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm()

    this.form.valueChanges.subscribe(this.updateFormProgressValue.bind(this))
    this.updateFormProgressValue()
  }

  buildForm(): void {
    this.form = this.fb.group({
      contactsLastname: [this.order?.contactsLastname, [FormValidators.required, FormValidators.textRus]],
      contactsName: [this.order?.contactsName, [FormValidators.required, FormValidators.textRus]],
      contactsPatronymic: [this.order?.contactsPatronymic, [FormValidators.textRus]],
      contactsPhone: [this.order?.contactsPhone, [FormValidators.required, FormValidators.mobilePhone]],
      contactsStatus: [this.order?.contactsStatus, [FormValidators.required]],
    })
  }

  submit(): void {
    this.form.markAllAsTouched()
    console.log(this.form.invalid)
    if (this.form.invalid) { return }

    this.app.saveAdditionalContact(this.serializeForm())
  }

  updateFormProgressValue(): void {
    const fields = [
      { control: this.contactsLastnameControl, id: 'contactsLastname' },
      { control: this.contactsNameControl, id: 'contactsName' },
      { control: this.contactsPatronymicControl, id: 'contactsPatronymic' },
      { control: this.contactsPhoneControl, id: 'contactsPhone' },
      { control: this.contactsStatusControl, id: 'contactsStatus' },
    ]

    this.formProgressValue = this.formProgress.getFormStepPercent(fields)
  }

  onClickBackButton(): void {
    this.app.updateOrder(this.serializeForm())
    this.app.setPage('employment_and_income')
  }

  private serializeForm(): SaveAdditionalContactRequestInterface {
    return this.form.value
  }

  get contactsLastnameControl(): FormControl {
    return this.form.get('contactsLastname') as FormControl
  }

  get contactsNameControl(): FormControl {
    return this.form.get('contactsName') as FormControl
  }

  get contactsPatronymicControl(): FormControl {
    return this.form.get('contactsPatronymic') as FormControl
  }

  get contactsPhoneControl(): FormControl {
    return this.form.get('contactsPhone') as FormControl
  }

  get contactsStatusControl(): FormControl {
    return this.form.get('contactsStatus') as FormControl
  }

}
