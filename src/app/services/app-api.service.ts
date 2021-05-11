import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { AppApiMockup } from './app-api.mockup'
import {
  CheckPhoneRequestInterface,
  CheckPhoneResponseInterface,
  CheckSMSRequestInterface, GetProductOfferListResponseInterface,
  InitOrderFormResponseInterface,
  SaveAdditionalContactRequestInterface,
  SaveAnketaRequestInterface, SaveEmploymentAndIncomeRequestInterface,
  SavePassportRequestInterface,
  SendSMSResponseInterface
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

  sendSMS(): Observable<SendSMSResponseInterface> {
    const mockupData = getMockup('/sendSMS', AppApiMockup.sendSMS.success)
    const requestData = {
      path: '/sendSMS',
      mockupData,
    }

    return this.api.post(requestData)
  }

  checkSMS(body: CheckSMSRequestInterface): Observable<SendSMSResponseInterface> {
    const code = body.code
    let mockupType = 'success'
    if (code === '0000') { mockupType = 'successInvalidCode' }
    if (code === '1111') { mockupType = 'successLimit' }

    const mockupData = getMockup('/checkSMS', AppApiMockup.checkSMS[mockupType], body)
    const requestData = {
      path: '/checkSMS',
      mockupData,
      body
    }

    return this.api.post(requestData)
  }

  savePassport(body: SavePassportRequestInterface): Observable<any> {
    const mockupData = getMockup('/savePassport', AppApiMockup.savePassport.success, body)
    const requestData = {
      path: '/savePassport',
      mockupData,
      body
    }

    return this.api.post(requestData)
  }

  saveEmploymentAndIncome(body: SaveEmploymentAndIncomeRequestInterface): Observable<any> {
    const mockupData = getMockup('/saveEmploymentAndIncome', AppApiMockup.saveEmploymentAndIncome.success, body)
    const requestData = {
      path: '/saveEmploymentAndIncome',
      mockupData,
      body
    }

    return this.api.post(requestData)
  }

  saveAdditionalContact(body: SaveAdditionalContactRequestInterface): Observable<any> {
    const mockupData = getMockup('/saveAdditionalContact', AppApiMockup.saveAdditionalContact.success, body)
    const requestData = {
      path: '/saveAdditionalContact',
      mockupData,
      body
    }

    return this.api.post(requestData)
  }

  getProductOfferList(): Observable<GetProductOfferListResponseInterface> {
    const mockupData = getMockup('/getProductOfferList', AppApiMockup.getProductOfferList.success)
    const requestData = {
      path: '/getProductOfferList',
      mockupData
    }

    return this.api.post(requestData)
  }

  couca_6_9(body: SaveAdditionalContactRequestInterface): Observable<any> {
    const mockupData = getMockup('/couca_6_9', AppApiMockup.couca_6_9.success, body)
    const requestData = {
      path: '/couca_6_9',
      mockupData,
      body
    }

    return this.api.post(requestData)
  }
}
