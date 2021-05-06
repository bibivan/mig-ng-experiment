import { Component, Input, OnInit } from '@angular/core'
import { AppStateInterface } from '../../services/app.model'

@Component({
  selector: 'app-additional-contact',
  templateUrl: './additional-contact.component.html',
  styleUrls: ['./additional-contact.component.scss']
})
export class AdditionalContactComponent implements OnInit {
  @Input() state: AppStateInterface

  constructor() { }

  ngOnInit(): void {
  }

}
