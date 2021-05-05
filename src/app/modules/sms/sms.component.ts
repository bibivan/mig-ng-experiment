import { Component, Input, OnInit } from '@angular/core'
import { AppStateInterface } from '../../services/app.model'
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {
  @Input() state: AppStateInterface

  constructor(
    private app: AppService
  ) { }

  ngOnInit(): void {
  }

  onCodeCompleted(code: string): void {
    console.log('code', code)
  }

  clickedBack(): void {
    this.app.setPage('anketa')
  }

  sendSMS(): void {
    this.app.sendSMS()
  }
}
