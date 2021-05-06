import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ClassificatorSelectOptions } from '../../helpers/classificator-select-options'
import { AppStateInterface, OrderInterface } from '../../services/app.model'
import { selectOptionsType } from '../../shared/select/select.model'

@Component({
  selector: 'app-additional-contact',
  templateUrl: './additional-contact.component.html',
  styleUrls: ['./additional-contact.component.scss']
})
export class AdditionalContactComponent implements OnInit {
  @Input() state: AppStateInterface

  order: OrderInterface
  form: FormGroup
  formProgressValue = 0

  contactsStatusOptions: selectOptionsType

  constructor() { }

  ngOnInit(): void {
  }

}
