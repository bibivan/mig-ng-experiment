import { Injectable } from '@angular/core'
import { interval, Subject, Subscription, timer } from 'rxjs'
import {
  CheckSMSRequestInterface,
  CheckSMSResponseInterface,
  InitOrderFormResponseInterface, SaveAdditionalContactRequestInterface,
  SaveAnketaRequestInterface, SaveEmploymentAndIncomeRequestInterface, SavePassportRequestInterface
} from './app-api.model'
import { AppApiService } from './app-api.service'
import { appPagesType, AppStateInterface, OrderInterface, SMSSettingsInterface } from './app.model'
import { GetTokenResponseInterface } from './authentication.model'
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
    isInit: false,
    isOpenPersonalAccountHint: false,
    isOpenToastAnketaSMS: false,
    order: null,
    page: null,
    status: 'string',
  }

  state$: Subject<AppStateInterface> = new Subject<AppStateInterface>()

  countError = 0

  timerAnketaSMSSub: Subscription
  timerToastSMSSub: Subscription

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

  getToken(): void {
    this.authentication.getToken().subscribe(
      (data: GetTokenResponseInterface) => {
        this.initForm()
      },
      () => this.errorHandler(this.getToken.bind(this)),
    )
  }

  init(): void {
    this.api.initOrderForm().subscribe(
      (data: InitOrderFormResponseInterface) => {
        this.updateOrder(data.order)
        this.initCompleted()

        // процесс дозаписи
        this.setPage('anketa')
      },
      () => this.errorHandler(this.getToken.bind(this))
    )
  }

  setPage(page: appPagesType): void {
    this.state.page = page
    this.refreshState()
  }

  saveAnketa(data: SaveAnketaRequestInterface): void {
    this.showPreloader()
    this.updateOrder(data)

    this.api.saveAnketa(data).subscribe(
      () => {
        this.sendSMS()
      },
      () => this.errorHandler(this.saveAnketa.bind(this))
    )
  }

  sendSMS(): void {
    this.showPreloader()
    this.api.sendSMS().subscribe(
      (data) => {
        if (!data) {
          this.errorHandler(this.sendSMS.bind(this))
          return
        }

        this.state.anketaSMS.limit = !data.repeatSendSMS
        this.state.anketaSMS.seconds = data.smsSeconds
        this.state.anketaSMS.code = ''
        this.updateTimerAnketaSMS()
        this.setPage('sms')
        this.openToastAnketaSMS()
      },
      () => this.errorHandler(this.sendSMS.bind(this))
    )
  }

  checkSMS(code: string): void {
    this.showPreloader()

    const body: CheckSMSRequestInterface = { code }
    this.api.checkSMS(body).subscribe(
      (data: CheckSMSResponseInterface) => {
        this.setPage('passport')
        this.openPersonalAccountHint()
      },
      () => this.errorHandler(this.checkSMS.bind(this))
    )
  }

  savePassport(data: SavePassportRequestInterface): void {
    this.showPreloader()
    this.updateOrder(data)

    this.api.savePassport(data).subscribe(
      () => {
        this.setPage('employment_and_income')
      },
      () => this.errorHandler(this.savePassport.bind(this))
    )
  }

  saveEmploymentAndIncome(data: SaveEmploymentAndIncomeRequestInterface): void {
    this.showPreloader()
    this.updateOrder(data)

    this.api.saveEmploymentAndIncome(data).subscribe(
      () => {
        this.setPage('additional_contact')
      },
      () => this.errorHandler(this.saveEmploymentAndIncome.bind(this))
    )
  }

  saveAdditionalContact(data: SaveAdditionalContactRequestInterface): void {
    this.showPreloader()
    this.updateOrder(data)

    this.api.saveAdditionalContact(data).subscribe(
      () => {
        this.setPage('products')
      },
      () => this.errorHandler(this.saveAdditionalContact.bind(this))
    )
  }

  updateOrder(data: any): void {
    this.state.order = Object.assign({}, this.state.order, data)
    this.refreshState()
  }

  openToastAnketaSMS(): void {
    this.state.isOpenToastAnketaSMS = true
    this.timerToastSMSSub = timer(5000).subscribe(this.closeToastAnketaSMS.bind(this))
    this.refreshState()
  }

  closeToastAnketaSMS(): void {
    this.state.isOpenToastAnketaSMS = false
    this.timerToastSMSSub?.unsubscribe()
    this.refreshState()
  }

  openPersonalAccountHint(): void {
    this.state.isOpenPersonalAccountHint = true
    this.refreshState()
  }

  closePersonalAccountHint(): void {
    this.state.isOpenPersonalAccountHint = false
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

  private executeRequest(method: any, time = 2000): void {
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
