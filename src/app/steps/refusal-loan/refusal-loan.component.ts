import { Component, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { FormValidators } from '../../helpers/form-validators'
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

    this.form.valueChanges.subscribe((value) => {
      console.log(value)
    })
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) { return }

    console.log('submit')
  }

  close(): void {
    this.app.closeRefusalLoanModal()
  }

  get reasonControl(): FormControl {
    return this.form.get('reason') as FormControl
  }

}
