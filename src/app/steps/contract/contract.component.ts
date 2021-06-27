import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { FormValidators } from '../../helpers/form-validators'
import { Scas_5_7_RequestInterface } from '../../services/api.model'
import { ContractInterface, ContractSigningInterface, OrderInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() contract!: ContractInterface | null
  @Input() sms!: ContractSigningInterface | null
  @Input() order!: OrderInterface | null

  @ViewChild('contractSigningBlock', { static: true }) contractSigningBlock!: ElementRef

  form!: FormGroup
  code: string = ''

  constructor(
    private app: AppService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm()
  }

  ngOnDestroy(): void {
    this.app.stopTimerContractSMS()
    this.app.closeToast()
  }

  ngAfterViewChecked(): void {
    if (this.sms?.countSendSMS) {
      const scrollTop = this.contractSigningBlock?.nativeElement.offsetTop || 0
      document.body.scrollTop = scrollTop
    }
  }

  buildForm(): void {
    this.code = this.sms?.code || ''
    this.form = this.fb.group({
      code: [this.code, [FormValidators.required]]
    })
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) { return }

    this.app.scas_5_7(this.serializeForm())
  }

  openSumLoanHint(event: MouseEvent): void {
    event.preventDefault()
    this.app.openModal('sum_loan')
  }

  serializeForm(): Scas_5_7_RequestInterface {
    return this.form.value
  }

  scas_5_6(): void {
    this.app.scas_5_6()
  }

  scas_5_61(): void {
    this.app.scas_5_61()
  }

  get codeControl(): FormControl {
    return this.form.get('code') as FormControl
  }

}
