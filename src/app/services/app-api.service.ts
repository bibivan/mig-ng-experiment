import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { AppApiMockup } from './app-api.mockup'
import { CheckPhoneRequestInterface, InitOrderFormResponseInterface } from './app-api.model'
import { OrderInterface } from './app.model'
import { getMockup } from './get-mockup'

@Injectable({
  providedIn: 'root'
})
export class AppApiService {

  constructor(
    private api: ApiService
  ) {}

  initOrderForm(): Observable<InitOrderFormResponseInterface> {
    const mockupData = getMockup('/initOrderForm', AppApiMockup.initOrderForm.success)
    const requestData = {
      path: '/initOrderForm',
      mockupData
    }

    return this.api.get(requestData)
  }

  checkPhone(body: CheckPhoneRequestInterface): Observable<any> {
    const mockupData = getMockup('/checkPhone', AppApiMockup.checkPhone.success, body)
    const requestData = {
      path: '/checkPhone',
      mockupData,
      body,
    }

    return this.api.post(requestData)
  }

  saveAnketa(): Observable<any> {
    const mockupData = getMockup('/saveAnketa', AppApiMockup.saveAnketa.success)
    const requestData = {
      path: '/saveAnketa',
      mockupData
    }

    return this.api.get(requestData)
  }


}
