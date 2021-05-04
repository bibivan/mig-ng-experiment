import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { AppApiMockup } from './app-api.mockup'
import {
  CheckPhoneRequestInterface,
  CheckPhoneResponseInterface,
  InitOrderFormResponseInterface, SaveAnketaRequestInterface
} from './app-api.model'
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

  checkPhone(body: CheckPhoneRequestInterface): Observable<CheckPhoneResponseInterface> {
    const phone = body.phone
    let mockupType = 'success'
    if (phone === '9999999107') { mockupType = 'successActiveCurrentAccount' }
    if (phone === '9999999114') { mockupType = 'successUnfinishedApplication' }
    if (phone === '9999999111') { mockupType = 'successPromotions' }

    const mockupData = getMockup('/checkPhone', AppApiMockup.checkPhone[mockupType], body)

    const requestData = {
      path: '/checkPhone',
      mockupData,
      body,
    }

    return this.api.post(requestData)
  }

  saveAnketa(body: SaveAnketaRequestInterface): Observable<any> {
    const mockupData = getMockup('/saveAnketa', AppApiMockup.saveAnketa.success, body)
    const requestData = {
      path: '/saveAnketa',
      mockupData,
      body
    }

    return this.api.post(requestData)
  }


}
