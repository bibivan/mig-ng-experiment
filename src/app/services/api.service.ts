import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EMPTY, Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { ApiMockup } from './api.mockup'
import {
  ApiInterface,
  CheckPhoneRequestInterface,
  CheckPhoneResponseInterface,
  CheckPromoCodeRequestInterface,
  CheckPromoCodeResponseInterface,
  CheckSMSRequestInterface,
  CheckSMSResponseInterface,
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
  SaveAnketaResponseInterface,
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
import { getMockup } from './get-mockup'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private mockup: boolean = environment.mockup
  private apiUrl: string = environment.apiUrl

  constructor(
    private http: HttpClient
  ) {}

  initOrderForm(): Observable<InitOrderFormResponseInterface> {
    const mockupData = getMockup('/initOrderForm', ApiMockup.initOrderForm.success)
    const requestData = {
      path: '/initOrderForm',
      mockupData
    }

    return this.get(requestData)
  }

  checkPhone(body: CheckPhoneRequestInterface): Observable<CheckPhoneResponseInterface> {
    const phone = body.phone
    let mockupType = 'success'
    if (phone === '9999999107') { mockupType = 'successActiveCurrentAccount' }
    if (phone === '9999999114') { mockupType = 'successUnfinishedApplication' }
    if (phone === '9999999111') { mockupType = 'successPromotions' }

    // @ts-ignore
    const mockupData = getMockup('/checkPhone', ApiMockup.checkPhone[mockupType], body)

    const requestData = {
      path: '/checkPhone',
      mockupData,
      body,
    }

    return this.post(requestData)
  }

  saveAnketa(body: SaveAnketaRequestInterface): Observable<SaveAnketaResponseInterface> {
    const mockupData = getMockup('/saveAnketa', ApiMockup.saveAnketa.success, body)
    const requestData = {
      path: '/saveAnketa',
      mockupData,
      body
    }

    return this.post(requestData)
  }

  getUcdbId(): Observable<GetUcdbIdResponseInterface> {
    const mockupData = getMockup('/getUcdbId', ApiMockup.getUcdbId.success)
    const requestData = {
      path: '/getUcdbId',
      mockupData,
    }

    return this.post(requestData)
  }

  couca_100(): Observable<any> {
    const mockupData = getMockup('/couca_100', ApiMockup.couca_100.success)
    const requestData = {
      path: '/couca_100',
      mockupData,
    }

    return this.post(requestData)
  }

  getStatusAnketa(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusAnketa', ApiMockup.getStatusAnketa.success)
    const requestData = {
      path: '/getStatusAnketa',
      mockupData,
    }

    return this.post(requestData)
  }

  sendSMS(): Observable<SendSMSResponseInterface> {
    const mockupData = getMockup('/sendSMS', ApiMockup.sendSMS.success)
    const requestData = {
      path: '/sendSMS',
      mockupData,
    }

    return this.post(requestData)
  }

  checkSMS(body: CheckSMSRequestInterface): Observable<CheckSMSResponseInterface> {
    const code = body.code
    let mockupType = 'success'
    if (code === '0000') { mockupType = 'successInvalidCode' }
    if (code === '1111') { mockupType = 'successLimit' }

    // @ts-ignore
    const mockupData = getMockup('/checkSMS', ApiMockup.checkSMS[mockupType], body)
    const requestData = {
      path: '/checkSMS',
      mockupData,
      body
    }

    return this.post(requestData)
  }

  couca_2_3(): Observable<any> {
    const mockupData = getMockup('/couca_2_3', ApiMockup.couca_2_3.success)
    const requestData = {
      path: '/couca_2_3',
      mockupData,
    }

    return this.post(requestData)
  }

  couca_3_5(): Observable<any> {
    const mockupData = getMockup('/couca_3_5', ApiMockup.couca_3_5.success)
    const requestData = {
      path: '/couca_3_5',
      mockupData,
    }

    return this.post(requestData)
  }

  clientSmevIdentity(body: ClientSmevIdentityRequestInterface): Observable<any> {
    const mockupData = getMockup('/clientSmevIdentity', ApiMockup.clientSmevIdentity.success, body)
    const requestData = {
      path: '/clientSmevIdentity',
      mockupData,
      body
    }

    return this.post(requestData)
  }

  savePassport(body: SavePassportRequestInterface): Observable<any> {
    const mockupData = getMockup('/savePassport', ApiMockup.savePassport.success, body)
    const requestData = {
      path: '/savePassport',
      mockupData,
      body
    }

    return this.post(requestData)
  }

  couca_3_6(): Observable<any> {
    const mockupData = getMockup('/couca_3_6', ApiMockup.couca_3_6.success)
    const requestData = {
      path: '/couca_3_6',
      mockupData,
    }

    return this.post(requestData)
  }

  saveEmploymentAndIncome(body: SaveEmploymentAndIncomeRequestInterface): Observable<any> {
    const mockupData = getMockup('/saveEmploymentAndIncome', ApiMockup.saveEmploymentAndIncome.success, body)
    const requestData = {
      path: '/saveEmploymentAndIncome',
      mockupData,
      body
    }

    return this.post(requestData)
  }

  saveAdditionalContact(body: SaveAdditionalContactRequestInterface): Observable<any> {
    const mockupData = getMockup('/saveAdditionalContact', ApiMockup.saveAdditionalContact.success, body)
    const requestData = {
      path: '/saveAdditionalContact',
      mockupData,
      body
    }

    return this.post(requestData)
  }

  couca_3_7(): Observable<any> {
    const mockupData = getMockup('/couca_3_7', ApiMockup.couca_3_7.success)
    const requestData = {
      path: '/couca_3_7',
      mockupData,
    }

    return this.post(requestData)
  }

  getStatusFullAnketa(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusAnketa', ApiMockup.getStatusFullAnketa.successSNILS)
    const requestData = {
      path: '/getStatusFullAnketa',
      mockupData,
    }

    return this.post(requestData)
  }

  saveSNILS(body: SaveSNILSRequestInterface): Observable<any> {
    const mockupData = getMockup('/saveSNILS', ApiMockup.saveSNILS.success, body)
    const requestData = {
      path: '/saveSNILS',
      mockupData,
      body
    }

    return this.post(requestData)
  }

  couca_5_0_1(): Observable<any> {
    const mockupData = getMockup('/couca_5_0_1', ApiMockup.couca_5_0_1.success)
    const requestData = {
      path: '/couca_5_0_1',
      mockupData,
    }

    return this.post(requestData)
  }

  getStatusSNILS(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusSNILS', ApiMockup.getStatusSNILS.success)
    const requestData = {
      path: '/getStatusSNILS',
      mockupData,
    }

    return this.post(requestData)
  }

  getProductOfferList(): Observable<GetProductOfferListResponseInterface> {
    const mockupData = getMockup('/getProductOfferList', ApiMockup.getProductOfferList.success)
    const requestData = {
      path: '/getProductOfferList',
      mockupData
    }

    return this.post(requestData)
  }

  couca_6_9(body: Couca_6_9_ResponseInterface): Observable<any> {
    const mockupData = getMockup('/couca_6_9', ApiMockup.couca_6_9.success, body)
    const requestData = {
      path: '/couca_6_9',
      mockupData,
      body
    }

    return this.post(requestData)
  }

  saveProduct(body: SaveProductRequestInterface): Observable<any> {
    const mockupData = getMockup('/saveProduct', ApiMockup.saveProduct.success, body)
    const requestData = {
      path: '/saveProduct',
      mockupData,
      body
    }

    return this.post(requestData)
  }

  coucaProduct(): Observable<any> {
    const mockupData = getMockup('/coucaProduct', ApiMockup.coucaProduct.success)
    const requestData = {
      path: '/coucaProduct',
      mockupData,
    }

    return this.post(requestData)
  }

  getStatusProducts(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusProducts', ApiMockup.getStatusProducts.success)
    const requestData = {
      path: '/getStatusProducts',
      mockupData,
    }

    return this.post(requestData)
  }

  getPNEUrl(): Observable<GetPNEUrlResponseInterface> {
    const mockupData = getMockup('/getPNEUrl', ApiMockup.getPNEUrl.success)
    const requestData = {
      path: '/getPNEUrl',
      mockupData,
    }

    return this.post(requestData)
  }

  getStatusCardRegistration(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusCardRegistration', ApiMockup.getStatusCardRegistration.successHoldAmount)
    const requestData = {
      path: '/getStatusCardRegistration',
      mockupData,
    }

    return this.post(requestData)
  }

  saveHoldAmount(body: SaveHoldAmountRequestInterface): Observable<any> {
    const mockupData = getMockup('/saveHoldAmount', ApiMockup.saveHoldAmount.success, body)
    const requestData = {
      path: '/saveHoldAmount',
      mockupData,
      body
    }

    return this.post(requestData)
  }

  couca_1_31(): Observable<any> {
    const mockupData = getMockup('/couca_1_31', ApiMockup.couca_1_31.success)
    const requestData = {
      path: '/couca_1_31',
      mockupData,
    }

    return this.post(requestData)
  }

  getStatusHoldAmount(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusHoldAmount', ApiMockup.getStatusHoldAmount.success)
    const requestData = {
      path: '/getStatusHoldAmount',
      mockupData,
    }

    return this.post(requestData)
  }

  getApplicationContract(): Observable<GetApplicationContractResponseInterface> {
    const mockupData = getMockup('/getApplicationContract', ApiMockup.getApplicationContract.success)
    const requestData = {
      path: '/getApplicationContract',
      mockupData,
    }

    return this.post(requestData)
  }

  scas_5_6(): Observable<Scas_5_6_ResponseInterface> {
    const mockupData = getMockup('/scas_5_6', ApiMockup.scas_5_6.success)
    const requestData = {
      path: '/scas_5_6',
      mockupData,
    }

    return this.post(requestData)
  }

  scas_5_61(): Observable<Scas_5_61_ResponseInterface> {
    const mockupData = getMockup('/scas_5_61', ApiMockup.scas_5_61.success)
    const requestData = {
      path: '/scas_5_61',
      mockupData,
    }

    return this.post(requestData)
  }

  scas_5_7(body: Scas_5_7_RequestInterface): Observable<Scas_5_7_ResponseInterface> {
    const mockupData = getMockup('/scas_5_7', ApiMockup.scas_5_7.success, body)
    const requestData = {
      path: '/scas_5_7',
      mockupData,
      body,
    }

    return this.post(requestData)
  }

  getStatusSendSMSContract(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusSendSMSContract', ApiMockup.getStatusSendSMSContract.success)
    const requestData = {
      path: '/getStatusSendSMSContract',
      mockupData,
    }

    return this.post(requestData)
  }

  getStatusCheckSMSContract(): Observable<GetStatusResponseInterface> {
    const mockupData = getMockup('/getStatusCheckSMSContract', ApiMockup.getStatusCheckSMSContract.success)
    const requestData = {
      path: '/getStatusCheckSMSContract',
      mockupData,
    }

    return this.post(requestData)
  }

  checkPromoCode(body: CheckPromoCodeRequestInterface): Observable<CheckPromoCodeResponseInterface> {
    let mockupType = 'successInvalidPromoCode'
    if (body.promoCode === 'miglove') {
      mockupType = 'success'
    }

    // @ts-ignore
    const mockupData = getMockup('/creditApplication/anketa/checkPromoCode', ApiMockup.checkPromoCode[mockupType], body)

    const requestData = {
      path: '/creditApplication/anketa/checkPromoCode',
      mockupData,
      body
    }

    return this.post(requestData)
  }

  get(data: ApiInterface): Observable<any> {
    if (this.mockup) {
      return data.mockupData || EMPTY
    }

    return this.http.get(this.apiUrl + data.path, { params: data.params })
  }

  post(data: ApiInterface): Observable<any> {
    if (this.mockup) {
      return data.mockupData || EMPTY
    }

    return this.http.post(this.apiUrl + data.path, data.body)
  }
}
