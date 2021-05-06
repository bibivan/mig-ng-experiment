import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiInterface } from '../../services/api.model'
import { ApiService } from '../../services/api.service'
import { getMockup } from '../../services/get-mockup'
import { CalculatorMockup } from './calculator.mockup'
import { CalculatorDataInterface } from './calculator.model'

@Injectable({
  providedIn: 'root'
})
export class CalculatorApiService {

  constructor(
    private api: ApiService
  ) { }

  getCalculator(): Observable<CalculatorDataInterface> {
    const requestData: ApiInterface = {
      path: '/pad/getCalculator',
      mockupData: getMockup('/pad/getCalculator', CalculatorMockup.getCalculator.success),
    }

    return this.api.get(requestData)
  }

}
