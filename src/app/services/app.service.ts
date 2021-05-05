import { Injectable } from '@angular/core'
import { interval, Subject, Subscription, timer } from 'rxjs'
import { InitOrderFormResponseInterface, SaveAnketaRequestInterface } from './app-api.model'
import { AppApiService } from './app-api.service'
import { appPagesType, AppStateInterface, OrderInterface, SMSSettingsInterface } from './app.model'
import { GetTokenResponseInterface } from './authentication.model'
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private state: AppStateInterface = {
    isInit: false,
    page: null,
    status: 'string',
    order: null,
    anketaSMS: {
      code: '',
      limit: false,
      seconds: 0,
    }
  }

  state$: Subject<AppStateInterface> = new Subject<AppStateInterface>()

  countError = 0

  timerAnketaSMSSub: Subscription

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
        this.sendSMS()
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
        this.setPage('sms')
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
      },
      () => this.errorHandler(this.sendSMS.bind(this))
    )
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
