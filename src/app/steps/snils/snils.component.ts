import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { FormValidators } from '../../helpers/form-validators'
import { openExternalLink } from '../../helpers/helper'
import { SaveSNILSRequestInterface } from '../../services/api.model'
import { OrderInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-snils',
  templateUrl: './snils.component.html',
  styleUrls: ['./snils.component.scss']
})
export class SnilsComponent implements OnInit {
  @Input() order: OrderInterface

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
      snils: [this.order.snils, [FormValidators.required, FormValidators.snils]]
    })
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) { return }

    this.app.saveSNILS(this.serializeForm())
  }

  onClickSupport(): void {
    openExternalLink('https://migone.ru/contacts/')
  }

  private serializeForm(): SaveSNILSRequestInterface {
    return this.form.value
  }

  get snilsControl(): FormControl {
    return this.form.get('snils') as FormControl
  }
}
