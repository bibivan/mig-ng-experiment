import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription, timer } from 'rxjs'
import { AppStateInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnDestroy {
  @Input() state: AppStateInterface

  constructor(
    private app: AppService
  ) { }

  ngOnDestroy(): void {
    this.app.closeToastAnketaSMS()
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
