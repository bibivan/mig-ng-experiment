import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { AppApiMockup } from './app-api.mockup'
import {
  CheckPhoneRequestInterface,
  CheckPhoneResponseInterface,
  CheckSMSRequestInterface,
  ClientSmevIdentityRequestInterface,
  Couca_6_9_ResponseInterface,
  GetApplicationContractResponseInterface,
  GetPNEUrlResponseInterface,
  GetProductOfferListResponseInterface,
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

  getUcdbId(): Observable<GetUcdbIdResponseInterface> {
    const mockupData = getMockup('/getUcdbId', AppApiMockup.getUcdbId.success)
    const requestData = {
      path: '/getUcdbId',
      mockupData,
    }

    return this.api.post(requestData)
  }

  couca_100(): Observable<any> {
    const mockupData = getMockup('/couca_100', AppApiMockup.couca_100.success)
    const requestData = {
      path: '/couca_100',
      mockupData,
    }

    return this.api.post(requestData)
  }

  getStatusAnketa(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusAnketa', AppApiMockup.getStatusAnketa.success)
    const requestData = {
      path: '/getStatusAnketa',
      mockupData,
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

  couca_2_3(): Observable<any> {
    const mockupData = getMockup('/couca_2_3', AppApiMockup.couca_2_3.success)
    const requestData = {
      path: '/couca_2_3',
      mockupData,
    }

    return this.api.post(requestData)
  }

  couca_3_5(): Observable<any> {
    const mockupData = getMockup('/couca_3_5', AppApiMockup.couca_3_5.success)
    const requestData = {
      path: '/couca_3_5',
      mockupData,
    }

    return this.api.post(requestData)
  }

  clientSmevIdentity(body: ClientSmevIdentityRequestInterface): Observable<any> {
    const mockupData = getMockup('/clientSmevIdentity', AppApiMockup.clientSmevIdentity.success, body)
    const requestData = {
      path: '/clientSmevIdentity',
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

  couca_3_6(): Observable<any> {
    const mockupData = getMockup('/couca_3_6', AppApiMockup.couca_3_6.success)
    const requestData = {
      path: '/couca_3_6',
      mockupData,
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

  couca_3_7(): Observable<any> {
    const mockupData = getMockup('/couca_3_7', AppApiMockup.couca_3_7.success)
    const requestData = {
      path: '/couca_3_7',
      mockupData,
    }

    return this.api.post(requestData)
  }

  getStatusFullAnketa(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusAnketa', AppApiMockup.getStatusFullAnketa.successSNILS)
    const requestData = {
      path: '/getStatusFullAnketa',
      mockupData,
    }

    return this.api.post(requestData)
  }

  saveSNILS(body: SaveSNILSRequestInterface): Observable<any> {
    const mockupData = getMockup('/saveSNILS', AppApiMockup.saveSNILS.success, body)
    const requestData = {
      path: '/saveSNILS',
      mockupData,
      body
    }

    return this.api.post(requestData)
  }

  couca_5_0_1(): Observable<any> {
    const mockupData = getMockup('/couca_5_0_1', AppApiMockup.couca_5_0_1.success)
    const requestData = {
      path: '/couca_5_0_1',
      mockupData,
    }

    return this.api.post(requestData)
  }

  getStatusSNILS(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusSNILS', AppApiMockup.getStatusSNILS.success)
    const requestData = {
      path: '/getStatusSNILS',
      mockupData,
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

  couca_6_9(body: Couca_6_9_ResponseInterface): Observable<any> {
    const mockupData = getMockup('/couca_6_9', AppApiMockup.couca_6_9.success, body)
    const requestData = {
      path: '/couca_6_9',
      mockupData,
      body
    }

    return this.api.post(requestData)
  }

  saveProduct(body: SaveProductRequestInterface): Observable<any> {
    const mockupData = getMockup('/saveProduct', AppApiMockup.saveProduct.success, body)
    const requestData = {
      path: '/saveProduct',
      mockupData,
      body
    }

    return this.api.post(requestData)
  }

  coucaProduct(): Observable<any> {
    const mockupData = getMockup('/coucaProduct', AppApiMockup.coucaProduct.success)
    const requestData = {
      path: '/coucaProduct',
      mockupData,
    }

    return this.api.post(requestData)
  }

  getStatusProducts(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusProducts', AppApiMockup.getStatusProducts.success)
    const requestData = {
      path: '/getStatusProducts',
      mockupData,
    }

    return this.api.post(requestData)
  }

  getPNEUrl(): Observable<GetPNEUrlResponseInterface> {
    const mockupData = getMockup('/getPNEUrl', AppApiMockup.getPNEUrl.success)
    const requestData = {
      path: '/getPNEUrl',
      mockupData,
    }

    return this.api.post(requestData)
  }

  getStatusCardRegistration(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusCardRegistration', AppApiMockup.getStatusCardRegistration.successHoldAmount)
    const requestData = {
      path: '/getStatusCardRegistration',
      mockupData,
    }

    return this.api.post(requestData)
  }

  saveHoldAmount(body: SaveHoldAmountRequestInterface): Observable<any> {
    const mockupData = getMockup('/saveHoldAmount', AppApiMockup.saveHoldAmount.success, body)
    const requestData = {
      path: '/saveHoldAmount',
      mockupData,
      body
    }

    return this.api.post(requestData)
  }

  couca_1_31(): Observable<any> {
    const mockupData = getMockup('/couca_1_31', AppApiMockup.couca_1_31.success)
    const requestData = {
      path: '/couca_1_31',
      mockupData,
    }

    return this.api.post(requestData)
  }

  getStatusHoldAmount(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusHoldAmount', AppApiMockup.getStatusHoldAmount.success)
    const requestData = {
      path: '/getStatusHoldAmount',
      mockupData,
    }

    return this.api.post(requestData)
  }

  getApplicationContract(): Observable<GetApplicationContractResponseInterface> {
    const mockupData = getMockup('/getApplicationContract', AppApiMockup.getApplicationContract.success)
    const requestData = {
      path: '/getApplicationContract',
      mockupData,
    }

    return this.api.post(requestData)
  }

  scas_5_6(): Observable<Scas_5_6_ResponseInterface> {
    const mockupData = getMockup('/scas_5_6', AppApiMockup.scas_5_6.success)
    const requestData = {
      path: '/scas_5_6',
      mockupData,
    }

    return this.api.post(requestData)
  }

  scas_5_61(): Observable<Scas_5_61_ResponseInterface> {
    const mockupData = getMockup('/scas_5_61', AppApiMockup.scas_5_61.success)
    const requestData = {
      path: '/scas_5_61',
      mockupData,
    }

    return this.api.post(requestData)
  }

  scas_5_7(body: Scas_5_7_RequestInterface): Observable<Scas_5_7_ResponseInterface> {
    const mockupData = getMockup('/scas_5_7', AppApiMockup.scas_5_7.success, body)
    const requestData = {
      path: '/scas_5_7',
      mockupData,
      body,
    }

    return this.api.post(requestData)
  }

  getStatusSendSMSContract(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusSendSMSContract', AppApiMockup.getStatusSendSMSContract.success)
    const requestData = {
      path: '/getStatusSendSMSContract',
      mockupData,
    }

    return this.api.post(requestData)
  }

  getStatusCheckSMSContract(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusCheckSMSContract', AppApiMockup.getStatusCheckSMSContract.incorrectSMSCode)
    const requestData = {
      path: '/getStatusCheckSMSContract',
      mockupData,
    }

    return this.api.post(requestData)
  }
}
