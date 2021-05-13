import { Injectable } from '@angular/core'
import { interval, Subject, Subscription, timer } from 'rxjs'
import { formattedMobilePhone, numberFormat } from '../helpers/helper'
import {
  CheckSMSRequestInterface,
  CheckSMSResponseInterface,
  Couca_6_9_RequestInterface,
  GetApplicationContractResponseInterface,
  GetProductOfferListResponseInterface, GetStatusResponseInterface, GetUcdbIdResponseInterface,
  InitOrderFormResponseInterface,
  SaveAdditionalContactRequestInterface,
  SaveAnketaRequestInterface, SaveAnketaResponseInterface,
  SaveEmploymentAndIncomeRequestInterface,
  SaveHoldAmountRequestInterface,
  SavePassportRequestInterface,
  SaveProductRequestInterface,
  SaveSNILSRequestInterface
} from './app-api.model'
import { AppApiService } from './app-api.service'
import { appPagesType, AppStateInterface, ContractInterface } from './app.model'
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private state: AppStateInterface = {
    anketaSMS: {
      code: '',
      limit: false,
      seconds: 0,
    },
    contract: null,
    isInit: false,
    isOpenInsuranceInfoHint: false,
    isOpenInsuranceTermHint: false,
    isOpenPersonalAccountHint: false,
    isOpenRefusalLoanModal: false,
    isOpenSumLoanHint: false,
    order: null,
    page: null,
    products: null,
    status: null,
    statusReason: null,
    toast: {
      caption: '',
      isOpen: false,
      text: '0',
    },
  }

  state$: Subject<AppStateInterface> = new Subject<AppStateInterface>()

  countError = 0

  timerAnketaSMSSub: Subscription
  timerToastSub: Subscription

  private readonly timeoutGetStatus = 15000
  private readonly timeoutNextRequest = 2000

  constructor(
    private api: AppApiService,
    private authentication: AuthenticationService,
  ) { }

  initForm(): void {
    if (this.authentication.token) {
      this.init()
    } else {
      this.getToken()
    }
  }

  // процесс дозаписи
  private routeInitForm(): void {
    this.sendSMS()
  }

  private getToken(): void {
    this.authentication.getToken().subscribe(
      () => {
        this.resetCountError()
        this.initForm()
      },
      () => this.errorHandler(this.getToken.bind(this)),
    )
  }

  // инициализация формы - первичное получение информации по заявке
  private init(): void {
    this.api.initOrderForm().subscribe(
      (response: InitOrderFormResponseInterface) => {
        this.resetCountError()
        this.updateOrder(response.order)
        this.initCompleted()
        this.routeInitForm()
      },
      () => this.errorHandler(this.getToken.bind(this))
    )
  }

  saveAnketa(data: SaveAnketaRequestInterface): void {
    this.showPreloader()
    this.updateOrder(data)

    this.api.saveAnketa(data).subscribe(
      (response: SaveAnketaResponseInterface) => {
        this.resetCountError()
        if (response.order?.ucdbId) {
          this.executeRequest(this.couca_100.bind(this))
        } else {
          this.executeRequest(this.getUcdbId.bind(this))
        }
      },
      () => this.errorHandler(this.saveAnketa.bind(this, data))
    )
  }

  private getUcdbId(): void {
    this.showPreloader()

    this.api.getUcdbId().subscribe(
      (response: GetUcdbIdResponseInterface) => {
        const ucdbId = response?.order?.ucdbId
        if (!ucdbId) {
          this.errorHandler(this.getUcdbId.bind(this))
          return
        }

        this.resetCountError()
        this.updateOrder({ ucdbId })
        this.executeRequest(this.couca_100.bind(this))
      },
      () => this.errorHandler(this.getUcdbId.bind(this))
    )
  }

  private couca_100(): void {
    this.showPreloader()

    this.api.couca_100().subscribe(
      () => {
        this.resetCountError()
        this.executeRequest(this.getStatusAnketa.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.couca_100.bind(this))
    )
  }

  private getStatusAnketa(): void {
    this.showPreloader()

    this.api.getStatusAnketa().subscribe(
      (response: GetStatusResponseInterface) => {
        if (this.isFinalStatusRouting(response)) { return }

        const status = response.order?.status
        if (status === '3.4') {
          this.sendSMS()
          return
        }

        this.executeRequest(this.getStatusAnketa.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.getStatusAnketa.bind(this))
    )
  }

  sendSMS(): void {
    this.showPreloader()
    this.api.sendSMS().subscribe(
      (response) => {
        if (!response) {
          this.errorHandler(this.sendSMS.bind(this))
          return
        }

        this.state.anketaSMS.limit = !response.repeatSendSMS
        this.state.anketaSMS.seconds = response.smsSeconds
        this.state.anketaSMS.code = ''
        this.updateTimerAnketaSMS()
        this.setPage('sms')
        this.openToastSendSMS()
      },
      () => this.errorHandler(this.sendSMS.bind(this))
    )
  }

  checkSMS(code: string): void {
    this.showPreloader()

    const body: CheckSMSRequestInterface = { code }
    this.api.checkSMS(body).subscribe(
      (response: CheckSMSResponseInterface) => {
        this.setPage('passport')
        this.openPersonalAccountHint()
      },
      () => this.errorHandler(this.checkSMS.bind(this, body))
    )
  }

  savePassport(data: SavePassportRequestInterface): void {
    this.showPreloader()
    this.updateOrder(data)

    this.api.savePassport(data).subscribe(
      () => {
        this.setPage('employment_and_income')
      },
      () => this.errorHandler(this.savePassport.bind(this, data))
    )
  }

  saveEmploymentAndIncome(data: SaveEmploymentAndIncomeRequestInterface): void {
    this.showPreloader()
    this.updateOrder(data)

    this.api.saveEmploymentAndIncome(data).subscribe(
      () => {
        this.setPage('additional_contact')
      },
      () => this.errorHandler(this.saveEmploymentAndIncome.bind(this, data))
    )
  }

  saveAdditionalContact(data: SaveAdditionalContactRequestInterface): void {
    this.showPreloader()
    this.updateOrder(data)

    this.api.saveAdditionalContact(data).subscribe(
      () => {
        this.getProductOfferList()
      },
      () => this.errorHandler(this.saveAdditionalContact.bind(this, data))
    )
  }

  getProductOfferList(): void {
    this.showPreloader()

    this.api.getProductOfferList().subscribe(
      (response: GetProductOfferListResponseInterface) => {
        const products = response?.order?.productOfferList || []
        if (!products || !products.length) {
          this.errorHandler(this.getProductOfferList.bind(this))
          return
        }

        this.state.products = products
        this.setPage('products')
        this.openToastProducts()
      },
      () => this.errorHandler(this.getProductOfferList.bind(this))
    )
  }

  couca_6_9(data: Couca_6_9_RequestInterface): void {
    this.showPreloader()

    this.api.couca_6_9(data).subscribe(
      () => {
        // финальный экран
        this.setPage('final')
      },
      () => this.errorHandler(this.couca_6_9.bind(this, data))
    )
  }

  saveProduct(data: SaveProductRequestInterface): void {
    this.showPreloader()

    this.api.saveProduct(data).subscribe(
      () => {
        this.executeRequest(this.getApplicationContract.bind(this))
      },
      () => this.errorHandler(this.saveProduct.bind(this, data))
    )
  }

  saveSNILS(data: SaveSNILSRequestInterface): void {
    this.showPreloader()
    this.updateOrder(data)

    this.api.saveSNILS(data).subscribe(
      () => {
        this.getApplicationContract()
      },
      () => this.errorHandler(this.saveSNILS.bind(this, data))
    )
  }

  saveHoldAmount(data: SaveHoldAmountRequestInterface): void {
    this.showPreloader()

    this.api.saveHoldAmount(data).subscribe(
      () => {
        this.getApplicationContract()
      },
      () => this.errorHandler(this.saveHoldAmount.bind(this, data))
    )
  }

  getApplicationContract(): void {
    this.showPreloader()

    this.api.getApplicationContract().subscribe(
      (response: GetApplicationContractResponseInterface) => {
        const contract: ContractInterface = response.order
        this.state.contract = Object.assign({},
          response.order,
          { contract: contract.contract }
        )
        this.setPage('contract')
      },
      () => this.errorHandler(this.getApplicationContract.bind(this))
    )
  }

  private getClientLoyalty(): void {

  }

  private executeRequest(method: any, time = this.timeoutNextRequest): void {
    timer(time).subscribe(method)
  }

  private errorHandler(repeat: any): void {
    this.countError++
    if (this.countError > 3) {
      this.setErrorPage('99')
      this.resetCountError()
      return
    }

    timer(7000).subscribe(() => {
      repeat()
    })
  }

  private resetCountError(): void {
    this.countError = 0
  }

  /**
   * Маршрутизация по финальным статусам при опросе статуса
   * @return возвращает флаг отработки маршрутизации по финальному статусу
   */
  private isFinalStatusRouting(data: GetStatusResponseInterface): boolean {
    if (!data) { return false }

    const isFinalStatus = data.isFinalStatus
    if (!isFinalStatus) { return false }

    const isGetClientLoyaltyStatus = data.isGetClientLoyaltyStatus
    const order = data.order
    const orderStatus = order?.status
    const orderStatusReason = order?.statusReason

    this.state.status = orderStatus
    this.state.statusReason = orderStatusReason

    if (isGetClientLoyaltyStatus) {
      this.getClientLoyalty()
    } else {
      this.setPage('final')
    }

    return true
  }

  getMaxApprovedSum(): number {
    if (!this.state?.products) { return 0 }

    return this.state.products
      .reduce((result, product) => {
        if (product.Amount > result) { result = product.Amount }
        return result
      }, 0)
  }

  openToast(caption = '', text = ''): void {
    this.state.toast.isOpen = true
    this.state.toast.caption = caption
    this.state.toast.text = text

    this.timerToastSub = timer(5000).subscribe(this.closeToast.bind(this))
    this.refreshState()
  }

  closeToast(): void {
    this.state.toast.isOpen = false
    this.timerToastSub?.unsubscribe()
    this.refreshState()
  }

  openToastProducts(): void {
    const maxApprovedSum = this.getMaxApprovedSum()
    this.openToast(
      'Поздравляем!',
      `Максимально одобренная для вас сумма — <span class="nobr">${ numberFormat(maxApprovedSum) }</span> рублей`
    )
  }

  openToastSendSMS(): void {
    this.openToast(
      'Введите код из SMS',
      `Мы отправили вам код на номер <span class="nobr">${ formattedMobilePhone(this.state.order.mobilePhone) }</span>`
    )
  }

  openPersonalAccountHint(): void {
    this.state.isOpenPersonalAccountHint = true
    this.refreshState()
  }

  closePersonalAccountHint(): void {
    this.state.isOpenPersonalAccountHint = false
    this.refreshState()
  }

  openInsuranceTermHint(): void {
    this.state.isOpenInsuranceTermHint = true
    this.refreshState()
  }

  closeInsuranceTermHint(): void {
    this.state.isOpenInsuranceTermHint = false
    this.refreshState()
  }

  openInsuranceInfoHint(): void {
    this.state.isOpenInsuranceInfoHint = true
    this.refreshState()
  }

  closeInsuranceInfoHint(): void {
    this.state.isOpenInsuranceInfoHint = false
    this.refreshState()
  }

  openSumLoanHint(): void {
    this.state.isOpenSumLoanHint = true
    this.refreshState()
  }

  closeSumLoanHint(): void {
    this.state.isOpenSumLoanHint = false
    this.refreshState()
  }

  openRefusalLoanModal(): void {
    this.state.isOpenRefusalLoanModal = true
    this.refreshState()
  }

  closeRefusalLoanModal(): void {
    this.state.isOpenRefusalLoanModal = false
    this.refreshState()
  }

  updateOrder(data: any): void {
    this.state.order = Object.assign({}, this.state.order, data)
    this.refreshState()
  }

  private updateTimerAnketaSMS(): void {
    if (this.state.anketaSMS.limit) {
      this.stopTimerAnketaSMS()
      return
    }

    this.stopTimerAnketaSMS()

    this.timerAnketaSMSSub = interval(1000).subscribe(() => {
      this.state.anketaSMS.seconds--
      if (this.state.anketaSMS.seconds === 0) { this.stopTimerAnketaSMS() }

      this.refreshState()
    })
  }

  private stopTimerAnketaSMS(): void {
    this.timerAnketaSMSSub?.unsubscribe()
  }

  setPage(page: appPagesType): void {
    this.state.page = page
    this.refreshState()
  }

  private setErrorPage(status: string): void {
    this.state.status = status
    this.setPage('final')
  }

  private refreshState(): void {
    this.state$.next(this.state)
  }

  private showPreloader(): void {
    this.setPage('preloader')
  }

  private initCompleted(): void {
    this.state.isInit = true
    this.refreshState()
  }
}
