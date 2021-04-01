import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AppStateInterface } from './services/app.model'
import { AppService } from './services/app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  state: AppStateInterface
  stateSub: Subscription

  constructor(
    private app: AppService
  ) {}

  ngOnInit(): void {
    this.stateSub = this.app.state$.subscribe(this.refreshState.bind(this))
    this.app.initForm()
  }

  ngOnDestroy(): void {
    this.stateSub?.unsubscribe()
  }

  private refreshState(data: AppStateInterface): void {
    this.state = Object.assign({}, data)
  }
}
