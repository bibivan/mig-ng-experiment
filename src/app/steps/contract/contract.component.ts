import { Component, Input, OnInit } from '@angular/core'
import { ContractInterface } from '../../services/app.model'

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  @Input() contract: ContractInterface

  constructor() { }

  ngOnInit(): void {
  }

}
