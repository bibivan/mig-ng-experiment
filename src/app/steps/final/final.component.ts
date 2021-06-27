import { Component, Input, OnInit } from '@angular/core'
import { environment } from '../../../environments/environment'
import { openExternalLink } from '../../helpers/helper'
import { OrderInterface } from '../../services/app.model'

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {
  @Input() order!: OrderInterface | null
  @Input() status: string = ''

  date = new Date()

  ngOnInit(): void {
    this.date.setDate(this.date.getDate() + 61)
    document.body.scrollTop = 0
  }

  onButtonSiteClick(url: string = ''): void {
    openExternalLink(environment.siteUrl + url, '_self')
  }

}
