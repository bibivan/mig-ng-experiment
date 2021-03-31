import { Injectable } from '@angular/core'
import { AppStateInterface } from './app.model'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private state: AppStateInterface = {
    isInit: false,
    isLoading: true,
    page: null
  }

  constructor() { }
}
