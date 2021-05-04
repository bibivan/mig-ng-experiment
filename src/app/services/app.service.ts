import { Injectable } from '@angular/core'
import { Subject, timer } from 'rxjs'
import { InitOrderFormResponseInterface, SaveAnketaRequestInterface } from './app-api.model'
import { AppApiService } from './app-api.service'
import { appPagesType, AppStateInterface, OrderInterface } from './app.model'
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
  }

  state$: Subject<AppStateInterface> = new Subject<AppStateInterface>()

  countError = 0

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
        this.setPage('sms')
      },
      () => this.errorHandler(this.saveAnketa.bind(this))
    )
  }

  updateOrder(data: any): void {
    this.state.order = Object.assign({}, this.state.order, data)
    this.refreshState()
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
