import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { SaveProductRequestInterface } from '../../services/app-api.model'
import {
  OrderInterface,
  ProductInsuranceItemInterface,
  ProductItemInterface,
  productListType
} from '../../services/app.model'
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input() order: OrderInterface
  @Input() products: productListType

  maxApprovedAmount: number
  selectedProduct: ProductItemInterface
  selectedInsurance: ProductInsuranceItemInterface

  insuranceControl: FormControl = new FormControl(true)

  constructor(
    private app: AppService
  ) { }

  ngOnInit(): void {
    this.maxApprovedAmount = this.app.getMaxApprovedSum()
    this.changeProduct(this.products[0])
    this.insuranceControl.valueChanges.subscribe(this.onChangeInsurance.bind(this))
  }

  ngOnDestroy(): void {
    this.app.closeToast()
  }

  saveProduct(): void {
    this.app.saveProduct(this.serializeForm())
  }

  changeProduct(product: ProductItemInterface): void {
    this.selectedProduct = Object.assign({}, product)
    this.setInsurance(product)
  }

  setInsurance(product: ProductItemInterface): void {
    const insurance = this.getInsurance(product)
    if (insurance && this.insuranceControl.value) {
      this.selectedInsurance = Object.assign({}, insurance)
    } else {
      this.selectedInsurance = null
    }
  }

  onChangeInsurance(value: boolean): void {
    if (value) {
      this.setInsurance(this.selectedProduct)
    } else {
      this.setInsurance(null)
    }
  }

  getInsurance(product: ProductItemInterface): ProductInsuranceItemInterface {
    return product?.InsuranceList ? product.InsuranceList[0] : null
  }

  getRegularPayment(product: ProductItemInterface): number {
    const insurance = this.getInsurance(product)
    let insuranceAmount = 0
    if (insurance?.amount && this.insuranceControl.value) {
      insuranceAmount += insurance.amount
    }

    return product.RegularPayment + insuranceAmount
  }

  openInsuranceTermHint(event: MouseEvent): void {
    event.preventDefault()
    this.app.openInsuranceTermHint()
  }

  openInsuranceInfoHint(event: MouseEvent): void {
    event.preventDefault()
    this.app.openInsuranceInfoHint()
  }

  openRefusalLoanModal(event: MouseEvent): void {
    event.preventDefault()
    this.app.openRefusalLoanModal()
  }

  openSumLoanHint(event: MouseEvent): void {
    event.preventDefault()
    this.app.openSumLoanHint()
  }

  private serializeForm(): SaveProductRequestInterface {
    const insurance = this.selectedInsurance ? true : false
    const productId = this.selectedProduct.id

    return { insurance, productId }
  }
}
