import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { OrderInterface, SMSSettingsInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss'],
})
export class SmsComponent implements OnInit, OnDestroy {
  @Input() order: OrderInterface
  @Input() smsSettings: SMSSettingsInterface

  error = ''

  constructor(
    private app: AppService
  ) { }

  ngOnInit(): void {
    document.body.scrollTop = 0
  }

  ngOnDestroy(): void {
    this.app.closeToast()
  }

  onCodeCompleted(code: string): void {
    this.app.checkSMS(code)
  }

  onClickBack(): void {
    this.app.setPage('anketa')
  }

  sendSMS(): void {
    this.app.sendSMS()
  }

}
