import { HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs'

export type ApiResultCodeType = 'OK' | 'INVALID_REQUEST_DATA' | 'INVALID_ESB_RESPONSE'

export interface ApiResponseInterface {
  resultCode: ApiResultCodeType,
  payload: any
}

export interface ApiInterface {
  path: string,
  apiSite?: boolean,
  body?: any,
  params?: HttpParams,
  mockupData: Observable<any>,
}
