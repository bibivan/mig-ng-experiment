import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { FormValidators } from '../../helpers/form-validators'
import { Couca_6_9_ResponseInterface } from '../../services/app-api.model'
import { AppService } from '../../services/app.service'
import { inputRadioButtonListType } from '../../shared/input-radio/input-radio.model'

@Component({
  selector: 'app-refusal-loan',
  templateUrl: './refusal-loan.component.html',
  styleUrls: ['./refusal-loan.component.scss']
})
export class RefusalLoanComponent implements OnInit {
  form: FormGroup

  reasonItems: inputRadioButtonListType = [
    { value: 'Не устраивает срок займа', label: 'Не устраивает срок займа' },
    { value: 'Не устраивает сумма займа', label: 'Не устраивает сумма займа' },
    { value: 'Просто интересовался условиями', label: 'Просто интересовался условиями' },
    { value: 'Большой процент', label: 'Большой процент' },
    { value: 'Пока не готов стать клиентом migone', label: 'Пока не готов стать клиентом migone' },
    { value: 'Другое', label: 'Другое' },
  ]

  constructor(
    private app: AppService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      reason: ['', FormValidators.required]
    })
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) { return }

    this.close()
    this.app.couca_6_9(this.serializeForm())
  }

  close(): void {
    this.app.closeRefusalLoanModal()
  }

  private serializeForm(): Couca_6_9_ResponseInterface {
    return this.form.value
  }

  get reasonControl(): FormControl {
    return this.form.get('reason') as FormControl
  }

}
