import { Component, Input, OnInit } from '@angular/core'
import { OrderInterface } from '../../services/app.model'

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {
  @Input() order: OrderInterface

  constructor() { }

  ngOnInit(): void {
    document.body.scrollTop = 0
  }

}
