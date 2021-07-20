import { Injectable } from '@angular/core'
import { interval, Subject, Subscription, timer } from 'rxjs'
import { formattedMobilePhone, numberFormat, openExternalLink } from '../helpers/helper'
import {
  CheckSMSRequestInterface,
  CheckSMSResponseInterface,
  SmevIdentityRequestInterface,
  Couca_1_31_ResponseInterface,
  Couca_5_0_1_ResponseInterface,
  Couca_6_9_RequestInterface,
  GetApplicationContractResponseInterface,
  GetPNEUrlResponseInterface,
  GetProductsResponseInterface,
  GetStatusResponseInterface,
  GetUcdbIdResponseInterface,
  InitOrderFormResponseInterface,
  SaveAdditionalContactRequestInterface,
  SaveAnketaRequestInterface,
  SaveEmploymentAndIncomeRequestInterface,
  SaveHoldAmountRequestInterface,
  SavePassportRequestInterface,
  SaveProductRequestInterface,
  SaveSNILSRequestInterface,
  Scas_5_61_ResponseInterface,
  Scas_5_6_ResponseInterface,
  Scas_5_7_RequestInterface,
  Scas_5_7_ResponseInterface,
  SendSMSResponseInterface
} from './api.model'
import { ApiService } from './api.service'
import { appPagesType, AppStateInterface, ContractInterface, modalsType } from './app.model'
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
    contractSMS: {
      code: '',
      countSendSMS: 0,
      seconds: 0,
    },
    isInit: false,
    openModal: null,
    order: null,
    page: null,
    preloaderRequest: '',
    products: null,
    status: '',
    statusReason: '',
    toast: {
      caption: '',
      isOpen: false,
      text: '0',
    },
  }

  state$: Subject<AppStateInterface> = new Subject<AppStateInterface>()

  countError = 0

  timerAnketaSMSSub!: Subscription
  timerToastSub!: Subscription
  timerContractSMSSub!: Subscription

  private readonly timeoutGetStatus = 15000
  private readonly timeoutNextRequest = 2000

  constructor(
    private api: ApiService,
    private authentication: AuthenticationService,
  ) { }

  initForm(): void {
    if (this.authentication.token) {
      this.init()
    } else {
      this.getToken()
    }
  }

  private getToken(): void {
    this.authentication.getToken().subscribe(
      () => {
        this.resetCountError()
        this.init()
      },
      () => this.errorHandler(this.getToken.bind(this)),
    )
  }

  // инициализация формы - первичное получение информации по заявке
  private init(): void {
    this.showPreloader('init')
    this.api.initOrderForm().subscribe(
      (response: InitOrderFormResponseInterface) => {
        this.resetCountError()
        this.updateOrder(response?.order)
        this.initCompleted()
        this.routeInitForm()
      },
      () => this.errorHandler(this.getToken.bind(this))
    )
  }

  // процесс дозаписи
  private routeInitForm(): void {
    const { action = '', status = '', statusReason = '', ucdbId = '' } = this.state?.order || {}

    if (!action) {
      this.setPage('anketa')
      return
    }

    switch (action) {
      case 'saveAnketa':
        if (ucdbId) {
          this.executeRequest(this.couca_100.bind(this))
        } else {
          this.executeRequest(this.getUcdbId.bind(this))
        }
        break

      case 'getUcdbId':
        this.executeRequest(this.couca_100.bind(this))
        break

      case 'couca_100':
        this.executeRequest(this.getStatusAnketa.bind(this))
        break

      case 'getStatusAnketa':
        this.executeRequest(this.sendSMS.bind(this))
        break

      case 'sendSMS':
        if (status === '2.3') {
          this.executeRequest(this.couca_2_3.bind(this))
        } else {
          this.setPage('sms')
        }
        break

      case 'checkSMS':
        if (status === '2.3') {
          this.executeRequest(this.couca_2_3.bind(this))
        } else if (status === '3.5') {
          this.executeRequest(this.couca_3_5.bind(this))
        } else {
          this.setPage('sms')
        }
        break

      case 'couca_2_3':
        this.setErrorPage('2.3')
        break

      case 'couca_3_5':
        this.setPage('passport')
        this.openModal('personal_account')
        break

      case 'savePassport':
        // вызов smevIdentity без ожидания ответа
        this.smevIdentity({ snils: this.state.order?.snils || '' })
        this.executeRequest(this.couca_3_6.bind(this))
        break

      case 'couca_3_6':
        this.setPage('employment_and_income')
        break

      case 'saveEmploymentAndIncome':
        this.setPage('additional_contact')
        break

      case 'saveAdditionalContact':
        this.executeRequest(this.couca_3_7.bind(this))
        break

      case 'couca_3_7':
        this.executeRequest(this.getStatusFullAnketa.bind(this))
        break

      case 'getStatusFullAnketa':
        this.executeRequest(this.getStatusFullAnketa.bind(this))
        break

      case 'saveSNILS':
        this.executeRequest(this.couca_5_0_1.bind(this))
        break

      case 'couca_5_0_1':
        this.executeRequest(this.getStatusSNILS.bind(this))
        break

      case 'getStatusSNILS':
        this.executeRequest(this.getStatusSNILS.bind(this), this.timeoutGetStatus)
        break

      case 'getProductOfferList':
        this.executeRequest(this.getProductOfferList.bind(this))
        break

      case 'couca_6_9':
        this.setErrorPage('6.9')
        break

      case 'saveProduct':
        this.executeRequest(this.coucaProduct.bind(this))
        break

      case 'coucaProduct':
        this.executeRequest(this.getStatusProducts.bind(this), this.timeoutGetStatus)
        break

      case 'getStatusProducts':
        this.executeRequest(this.getStatusProducts.bind(this), this.timeoutGetStatus)
        break

      case 'getPNEUrl':
        this.executeRequest(this.getPNEUrl.bind(this))
        break

      case 'getStatusCardRegistration':
        this.executeRequest(this.getStatusCardRegistration.bind(this))
        break

      case 'saveHoldAmount':
        this.executeRequest(this.couca_1_31.bind(this))
        break

      case 'couca_1_31':
        this.executeRequest(this.getStatusHoldAmount.bind(this))
        break

      case 'getStatusHoldAmount':
        this.executeRequest(this.getStatusHoldAmount.bind(this))
        break

      case 'getApplicationContract':
        this.executeRequest(this.getApplicationContract.bind(this))
        break

      case 'scas_5_6':
        this.executeRequest(this.getStatusSendSMSContract.bind(this))
        break

      case 'scas_5_61':
        this.executeRequest(this.getStatusSendSMSContract.bind(this))
        break

      case 'scas_5_7':
        this.executeRequest(this.getStatusCheckSMSContract.bind(this))
        break

      case 'getStatusSendSMSContract':
        this.executeRequest(this.getStatusSendSMSContract.bind(this))
        break

      case 'getStatusCheckSMSContract':
        this.executeRequest(this.getStatusCheckSMSContract.bind(this))
        break

      default:
        this.step99()
    }
  }

  saveAnketa(data: SaveAnketaRequestInterface): void {
    this.showPreloader('saveAnketa')
    this.updateOrder(data)

    this.api.saveAnketa(data).subscribe(
      () => {
        this.resetCountError()
        if (this.state.order?.ucdbId) {
          this.executeRequest(this.couca_100.bind(this))
        } else {
          this.executeRequest(this.getUcdbId.bind(this))
        }
      },
      () => this.errorHandler(this.saveAnketa.bind(this, data))
    )
  }

  private getUcdbId(): void {
    this.showPreloader('getUcdbId')

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
    this.showPreloader('couca_100')

    this.api.couca_100().subscribe(
      () => {
        this.resetCountError()
        this.executeRequest(this.getStatusAnketa.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.couca_100.bind(this))
    )
  }

  private getStatusAnketa(): void {
    this.showPreloader('getStatusAnketa')

    this.api.getStatusAnketa().subscribe(
      (response: GetStatusResponseInterface) => {
        if (this.isFinalStatusRouting(response)) { return }

        this.resetCountError()

        const orderStatus = response?.order?.status
        if (orderStatus === '3.4') {
          this.executeRequest(this.sendSMS.bind(this))
          return
        }

        this.executeRequest(this.getStatusAnketa.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.getStatusAnketa.bind(this))
    )
  }

  sendSMS(): void {
    this.showPreloader('sendSMS')
    this.api.sendSMS().subscribe(
      (response: SendSMSResponseInterface) => {
        if (!response) {
          this.errorHandler(this.sendSMS.bind(this))
          return
        }

        this.resetCountError()

        const orderStatus = response?.order?.status
        if (orderStatus === '2.3') {
          this.executeRequest(this.couca_2_3.bind(this))
          return
        }

        if (this.state.anketaSMS) {
          this.state.anketaSMS.limit = !response.repeatSendSMS
          this.state.anketaSMS.seconds = response.smsSeconds || 0
          this.state.anketaSMS.code = ''
        }

        this.updateTimerAnketaSMS()
        this.setPage('sms')
        this.openToastSendSMS()
      },
      () => this.errorHandler(this.sendSMS.bind(this))
    )
  }

  checkSMS(code: string): void {
    this.showPreloader('checkSMS')

    if (this.state.anketaSMS) {
      this.state.anketaSMS.code = code
    }

    const body: CheckSMSRequestInterface = { code }

    this.api.checkSMS(body).subscribe(
      (response: CheckSMSResponseInterface) => {
        this.resetCountError()

        const orderStatus = response?.order?.status || ''
        if (orderStatus === '2.3') {
          this.executeRequest(this.couca_2_3.bind(this))
          return
        }

        if (!response.checkSMS) {
          this.setPage('sms')
          return
        }

        this.executeRequest(this.couca_3_5.bind(this))
      },
      () => this.errorHandler(this.checkSMS.bind(this, code))
    )
  }

  private couca_2_3(): void {
    this.showPreloader('couca_2_3')

    this.api.couca_2_3().subscribe(
      () => {
        this.resetCountError()
        this.state.status = '2.3'
        this.setPage('final')
      },
      () => this.errorHandler(this.couca_2_3.bind(this))
    )
  }

  private couca_3_5(): void {
    this.showPreloader('couca_3_5')

    this.api.couca_3_5().subscribe(
      () => {
        this.resetCountError()
        this.setPage('passport')
        this.openModal('personal_account')
      },
      () => this.errorHandler(this.couca_3_5.bind(this))
    )
  }

  smevIdentity(data: SmevIdentityRequestInterface): void {
    // Вызов сервиса SOAP /client/SmevIdentity (CliS)
    // без ожидания ответа и обработки результата
    this.api.smevIdentity(data).subscribe()
  }

  savePassport(data: SavePassportRequestInterface): void {
    this.showPreloader('savePassport')
    this.updateOrder(data)

    this.api.savePassport(data).subscribe(
      () => {
        this.resetCountError()
        // вызов smevIdentity без ожидания ответа
        this.smevIdentity({ snils: this.state.order?.snils || '' })

        this.executeRequest(this.couca_3_6.bind(this))
      },
      () => this.errorHandler(this.savePassport.bind(this, data))
    )
  }

  private couca_3_6(): void {
    this.showPreloader('couca_3_6')

    this.api.couca_3_6().subscribe(
      () => {
        this.resetCountError()
        this.setPage('employment_and_income')
      },
      () => this.errorHandler(this.couca_3_6.bind(this))
    )
  }

  saveEmploymentAndIncome(data: SaveEmploymentAndIncomeRequestInterface): void {
    this.showPreloader('saveEmploymentAndIncome')
    this.updateOrder(data)

    this.api.saveEmploymentAndIncome(data).subscribe(
      () => {
        this.setPage('additional_contact')
      },
      () => this.errorHandler(this.saveEmploymentAndIncome.bind(this, data))
    )
  }

  saveAdditionalContact(data: SaveAdditionalContactRequestInterface): void {
    this.showPreloader('saveAdditionalContact')
    this.updateOrder(data)

    this.api.saveAdditionalContact(data).subscribe(
      () => {
        this.executeRequest(this.couca_3_7.bind(this))
      },
      () => this.errorHandler(this.saveAdditionalContact.bind(this, data))
    )
  }

  private couca_3_7(): void {
    this.showPreloader('couca_3_7')

    this.api.couca_3_7().subscribe(
      () => {
        this.resetCountError()
        this.executeRequest(this.getStatusFullAnketa.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.couca_3_7.bind(this))
    )
  }

  private getStatusFullAnketa(): void {
    this.showPreloader('getStatusFullAnketa')

    this.api.getStatusFullAnketa().subscribe(
      (response: GetStatusResponseInterface) => {
        if (this.isFinalStatusRouting(response)) { return }

        this.resetCountError()

        const orderStatus = response?.order?.status
        if (orderStatus === '5.0') {
          this.executeRequest(this.getProductOfferList.bind(this))
          return
        }

        if (orderStatus === '5.0.2') {
          this.setPage('snils')
          return
        }

        this.executeRequest(this.getStatusFullAnketa.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.getStatusFullAnketa.bind(this))
    )
  }

  saveSNILS(data: SaveSNILSRequestInterface): void {
    this.showPreloader('saveSNILS')
    this.updateOrder(data)

    this.api.saveSNILS(data).subscribe(
      () => {
        this.executeRequest(this.couca_5_0_1.bind(this))
      },
      () => this.errorHandler(this.saveSNILS.bind(this, data))
    )
  }

  private couca_5_0_1(): void {
    this.showPreloader('couca_5_0_1')

    this.api.couca_5_0_1().subscribe(
      (response: Couca_5_0_1_ResponseInterface) => {
        this.resetCountError()

        const orderStatus = response?.order?.status || ''
        const finalStatuses = ['99', '5.0.4', '5.0.6', '5.11']
        const getProductOfferListStatuses = ['5.0']

        if (finalStatuses.includes(orderStatus)) {
          this.state.status = orderStatus
          this.setPage('final')
          return
        }

        if (getProductOfferListStatuses.includes(orderStatus)) {
          this.executeRequest(this.getProductOfferList.bind(this))
          return
        }

        this.executeRequest(this.getStatusSNILS.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.couca_5_0_1.bind(this))
    )
  }

  private getStatusSNILS(): void {
    this.showPreloader('getStatusSNILS')

    this.api.getStatusSNILS().subscribe(
      (response: GetStatusResponseInterface) => {
        if (this.isFinalStatusRouting(response)) { return }

        this.resetCountError()

        const orderStatus = response?.order?.status
        if (orderStatus === '5.0') {
          this.executeRequest(this.getProductOfferList.bind(this))
          return
        }

        if (orderStatus === '5.0.2') {
          this.setPage('snils')
          return
        }

        this.executeRequest(this.getStatusSNILS.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.getStatusSNILS.bind(this))
    )
  }

  private getProductOfferList(): void {
    this.showPreloader('getProductOfferList')

    this.api.getProducts().subscribe(
      (response: GetProductsResponseInterface) => {
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
    this.showPreloader('couca_6_9')

    this.api.couca_6_9(data).subscribe(
      () => {
        this.resetCountError()
        this.state.status = '6.9'
        this.setPage('final')
      },
      () => this.errorHandler(this.couca_6_9.bind(this, data))
    )
  }

  saveProduct(data: SaveProductRequestInterface): void {
    this.showPreloader('saveProduct')

    this.api.saveProduct(data).subscribe(
      () => {
        this.resetCountError()
        this.executeRequest(this.coucaProduct.bind(this))
      },
      () => this.errorHandler(this.saveProduct.bind(this, data))
    )
  }

  private coucaProduct(): void {
    this.showPreloader('coucaProduct')

    this.api.coucaProduct().subscribe(
      () => {
        this.resetCountError()
        this.executeRequest(this.getStatusProducts.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.coucaProduct.bind(this))
    )
  }

  private getStatusProducts(): void {
    this.showPreloader('getStatusProducts')

    this.api.getStatusProducts().subscribe(
      (response: GetStatusResponseInterface) => {
        if (this.isFinalStatusRouting(response)) { return }

        this.resetCountError()

        const orderStatus = response?.order?.status
        if (orderStatus === '1.20.1') {
          this.executeRequest(this.getPNEUrl.bind(this))
          return
        }

        this.executeRequest(this.getStatusProducts.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.getStatusProducts.bind(this))
    )
  }

  private getPNEUrl(): void {
    this.showPreloader('getPNEUrl')

    this.api.getPNEUrl().subscribe(
      (response: GetPNEUrlResponseInterface) => {
        const pneUrl = response?.url
        if (!pneUrl) {
          this.errorHandler(this.getPNEUrl.bind(this))
          return
        }

        openExternalLink(pneUrl, '_self')
      },
      () => this.errorHandler(this.getPNEUrl.bind(this))
    )
  }

  private getStatusCardRegistration(): void {
    this.showPreloader('getStatusCardRegistration')

    this.api.getStatusCardRegistration().subscribe(
      (response: GetStatusResponseInterface) => {
        if (this.isFinalStatusRouting(response)) { return }

        this.resetCountError()

        const orderStatus = response?.order?.status || ''
        const getProductsStatuses = ['5.0']

        if (getProductsStatuses.includes(orderStatus)) {
          this.executeRequest(this.getProductOfferList.bind(this))
          return
        }

        if (orderStatus === '1.21') {
          this.setPage('hold_amount')
          return
        }

        if (orderStatus === '5.4') {
          this.executeRequest(this.getApplicationContract.bind(this))
          return
        }

        this.executeRequest(this.getStatusCardRegistration.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.getStatusCardRegistration.bind(this))
    )
  }

  saveHoldAmount(data: SaveHoldAmountRequestInterface): void {
    this.showPreloader('saveHoldAmount')

    this.api.saveHoldAmount(data).subscribe(
      () => {
        this.resetCountError()
        this.executeRequest(this.couca_1_31.bind(this))
      },
      () => this.errorHandler(this.saveHoldAmount.bind(this, data))
    )
  }

  private couca_1_31(): void {
    this.showPreloader('couca_1_31')

    this.api.couca_1_31().subscribe(
      (response: Couca_1_31_ResponseInterface) => {
        this.resetCountError()

        const orderStatus = response?.order?.status || ''
        const finalStatuses = ['99', '5.3', '5.11']
        const getProductOfferListStatuses = ['5.0']

        if (finalStatuses.includes(orderStatus)) {
          this.state.status = orderStatus
          this.setPage('final')
          return
        }

        if (getProductOfferListStatuses.includes(orderStatus)) {
          this.executeRequest(this.getProductOfferList.bind(this))
          return
        }

        this.executeRequest(this.getStatusHoldAmount.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.couca_1_31.bind(this))
    )
  }

  private getStatusHoldAmount(): void {
    this.showPreloader('getStatusHoldAmount')

    this.api.getStatusHoldAmount().subscribe(
      (response: GetStatusResponseInterface) => {
        if (this.isFinalStatusRouting(response)) { return }

        this.resetCountError()

        const orderStatus = response?.order?.status || ''

        if (orderStatus === '1.21') {
          this.setPage('hold_amount')
          return
        }

        if (orderStatus === '5.4') {
          this.executeRequest(this.getApplicationContract.bind(this))
          return
        }

        this.executeRequest(this.getStatusHoldAmount.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.getStatusHoldAmount.bind(this))
    )
  }

  getApplicationContract(): void {
    this.showPreloader('getApplicationContract')

    this.api.getApplicationContract().subscribe(
      (response: GetApplicationContractResponseInterface) => {
        const contract: ContractInterface = response?.order
        this.state.contract = Object.assign({},
          contract,
          { contract: contract.contract }
        )

        this.setPage('contract')
      },
      () => this.errorHandler(this.getApplicationContract.bind(this))
    )
  }

  scas_5_6(): void {
    this.showPreloader('scas_5_6')

    this.api.scas_5_6().subscribe(
      (response: Scas_5_6_ResponseInterface) => {
        this.resetCountError()

        if (this.state.contractSMS) {
          this.state.contractSMS.countSendSMS++
        }

        const orderStatus = response?.order?.status || ''
        const finalStatuses = ['99', '5.11']
        if (finalStatuses.includes(orderStatus)) {
          this.state.status = orderStatus
          this.setPage('final')
          return
        }

        this.executeRequest(this.getStatusSendSMSContract.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.scas_5_6.bind(this))
    )
  }

  scas_5_61(): void {
    this.showPreloader('scas_5_61')

    this.api.scas_5_61().subscribe(
      (response: Scas_5_61_ResponseInterface) => {
        this.resetCountError()

        if (this.state.contractSMS) {
          this.state.contractSMS.countSendSMS++
        }


        const orderStatus = response?.order?.status || ''
        const finalStatuses = ['99', '5.11']
        if (finalStatuses.includes(orderStatus)) {
          this.state.status = orderStatus
          this.setPage('final')
          return
        }

        this.executeRequest(this.getStatusSendSMSContract.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.scas_5_61.bind(this))
    )
  }

  scas_5_7(body: Scas_5_7_RequestInterface): void {
    this.showPreloader('scas_5_7')

    if (this.state.contractSMS) {
      this.state.contractSMS.code = body.code
    }

    this.api.scas_5_7(body).subscribe(
      (response: Scas_5_7_ResponseInterface) => {
        this.resetCountError()

        const orderStatus = response?.order?.status || ''
        const finalStatuses = ['99', '5.11']
        if (finalStatuses.includes(orderStatus)) {
          this.state.status = orderStatus
          this.setPage('final')
          return
        }

        this.executeRequest(this.getStatusCheckSMSContract.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.scas_5_7.bind(this, body))
    )
  }

  private getStatusSendSMSContract(): void {
    this.showPreloader('getStatusSendSMSContract')

    this.api.getStatusSendSMSContract().subscribe(
      (response: GetStatusResponseInterface) => {
        if (this.isFinalStatusRouting(response)) { return }

        this.resetCountError()

        const orderStatus = response?.order?.status
        if (orderStatus === '5.73') {
          this.startTimerContractSMS()
          this.setPage('contract')
          this.openToastSendSMS()
          return
        }

        this.executeRequest(this.getStatusSendSMSContract.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.getStatusSendSMSContract.bind(this))
    )
  }

  private getStatusCheckSMSContract(): void {
    this.showPreloader('getStatusCheckSMSContract')

    this.api.getStatusCheckSMSContract().subscribe(
      (response: GetStatusResponseInterface) => {
        if (this.isFinalStatusRouting(response)) { return }

        this.resetCountError()

        const order = response.order
        const orderStatus = order?.status

        if (orderStatus === '5.71' || orderStatus === '5.73') {
          this.startTimerContractSMS()
          this.setPage('contract')
          return
        }

        this.executeRequest(this.getStatusCheckSMSContract.bind(this), this.timeoutGetStatus)
      },
      () => this.errorHandler(this.getStatusCheckSMSContract.bind(this))
    )
  }


  private getClientLoyalty(): void {

  }

  private step99(): void {
    this.showPreloader()

    this.api.step99().subscribe(
      () => this.setErrorPage('99'),
      () => this.setErrorPage('99')
    )
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
    const paymentKey = order?.paymentKey
    const needIdentifyBy = order?.needIdentifyBy

    this.updateOrder({ needIdentifyBy, paymentKey })

    this.state.status = orderStatus || ''
    this.state.statusReason = orderStatusReason || ''

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
      `Мы отправили вам код на номер <span class="nobr">${ formattedMobilePhone(this.state.order?.mobilePhone || '') }</span>`
    )
  }

  openModal(type: modalsType): void {
    this.state.openModal = type
    this.refreshState()
  }

  closeModal(): void {
    this.state.openModal = null
    this.refreshState()
  }

  updateOrder(data: any): void {
    this.state.order = Object.assign({}, this.state.order, data)
    this.refreshState()
  }

  private updateTimerAnketaSMS(): void {
    if (this.state.anketaSMS?.limit) {
      this.stopTimerAnketaSMS()
      return
    }

    this.stopTimerAnketaSMS()

    this.timerAnketaSMSSub = interval(1000).subscribe(() => {
      if (this.state.anketaSMS) {
        this.state.anketaSMS.seconds--
      }

      if (this.state.anketaSMS?.seconds === 0) {
        this.stopTimerAnketaSMS()
      }

      this.refreshState()
    })
  }

  private stopTimerAnketaSMS(): void {
    this.timerAnketaSMSSub?.unsubscribe()
  }

  private updateTimerContractSMS(): void {
    this.stopTimerAnketaSMS()

    this.timerContractSMSSub = interval(1000).subscribe(() => {
      if (this.state.contractSMS) {
        this.state.contractSMS.seconds--
      }
      if (this.state.contractSMS?.seconds === 0) { this.stopTimerContractSMS() }

      this.refreshState()
    })
  }

  private startTimerContractSMS(): void {
    if (this.state.contractSMS !== null) {
      this.state.contractSMS.seconds = 300
    }

    this.updateTimerContractSMS()
  }

  stopTimerContractSMS(): void {
    this.timerContractSMSSub?.unsubscribe()
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

  private showPreloader(preloaderRequest = ''): void {
    this.state.preloaderRequest = preloaderRequest
    this.setPage('preloader')
  }

  private initCompleted(): void {
    this.state.isInit = true
    this.refreshState()
  }
}
