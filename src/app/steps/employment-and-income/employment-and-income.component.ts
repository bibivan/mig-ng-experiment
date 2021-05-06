import { Component, Input, OnInit } from '@angular/core'
import { AppStateInterface } from '../../services/app.model'

@Component({
  selector: 'app-employment-and-income',
  templateUrl: './employment-and-income.component.html',
  styleUrls: ['./employment-and-income.component.scss']
})
export class EmploymentAndIncomeComponent implements OnInit {
  @Input() state: AppStateInterface

  formProgressValue = 0

  constructor() { }

  ngOnInit(): void {
  }

}
