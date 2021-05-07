import { Component, Input, OnInit } from '@angular/core'
import { OrderInterface } from '../../services/app.model'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() order: OrderInterface

  constructor() { }

  ngOnInit(): void {
  }

}
