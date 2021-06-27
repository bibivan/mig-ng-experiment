import { Component, Input, OnInit } from '@angular/core'
import { OrderInterface } from '../../services/app.model'

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {
  @Input() order!: OrderInterface | null
  @Input() status!: string

  messageId!: string
  technicalWorkStatuses = ['92', '93', '95', '96', '97', '98', '99', '5.11']
  rejectionStatuses = ['3.1', '3.2', '4.3', '4.5', '4.8', '5.2', '5.3', '6.3']


  constructor() { }

  ngOnInit(): void {
    document.body.scrollTop = 0
    this.messageId = this.getMessageId()
  }

  getMessageId(): string {

    if (this.technicalWorkStatuses.includes(this.status)) {
      return 'technical_work'
    }

    if (this.rejectionStatuses.includes(this.status)) {
      return 'rejection'
    }

    return this.status
  }

}


/**
 * '99'
 * '3.1' '3.2' '3.3'
 * '4.1' '4.3' '4.5' '4.6' '4.7' '4.74' '4.8'
 * '5.0.4' '5.0.6' '5.1.0' '5.2' '5.3' '5.11' '5.5' '5.55' '5.71' '5.72' '5.73'
 * '6.2' '6.3' '6.4'
 */
