import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { FormValidators } from '../../helpers/form-validators'
import { SaveHoldAmountRequestInterface } from '../../services/api.model'
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-hold-amount',
  templateUrl: './hold-amount.component.html',
  styleUrls: ['./hold-amount.component.scss']
})
export class HoldAmountComponent implements OnInit {

  form: FormGroup

  constructor(
    private app: AppService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void {
    this.form = this.fb.group({
      amount: [null, FormValidators.required]
    })
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) { return }

    this.app.saveHoldAmount(this.serializeForm())
  }

  private serializeForm(): SaveHoldAmountRequestInterface {
    return this.form.value
  }

  get amountControl(): FormControl {
    return this.form.get('amount') as FormControl
  }
}
