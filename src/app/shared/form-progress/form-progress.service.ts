import { Injectable } from '@angular/core'
import { formProgressStepsType, StepInfoInterface } from './form-progress.model'

@Injectable({
  providedIn: 'root'
})
export class FormProgressService {
  private readonly stepInfo = {
    anketa: {
      num: 1,
      minPercent: 0,
      maxPercent: 40,
      nextStepPercent: 35
    },
    passport: {
      num: 2,
      minPercent: 40,
      maxPercent: 75,
      nextStepPercent: 6
    },
    employment_and_income: {
      num: 3,
      minPercent: 75,
      maxPercent: 81,
      nextStepPercent: 5
    },
    personal_info: {
      num: 4,
      minPercent: 81,
      maxPercent: 100,
      nextStepPercent: 0
    },
  }

  private readonly fields = {
    mobilePhone: 10,
    lastname: 5,
    name: 5,
    patronymic: 5,
    dateBirthday: 8,
    email: 7,
    serialNumberPassport: 4,
    datePassport: 4,
    codePassport: 4,
    wherePassport: 0,
    placeBirthday: 0,
    prevLastname: 0,
    snils: 10,
    addressFactFlat: 1,
    addressFactHome: 1,
    addressFactKorp: 0,
    addressFactPunkt: 0,
    addressFactPunktCode: 1,
    addressFactRegion: 1,
    addressFactStr: 0,
    addressFactStreet: 1,
    addressFactStreetCode: 0,
    addressRegistrationFlat: 1,
    addressRegistrationHome: 1,
    addressRegistrationKorp: 0,
    addressRegistrationPunkt: 0,
    addressRegistrationPunktCode: 1,
    addressRegistrationRegion: 2,
    addressRegistrationStr: 0,
    addressRegistrationStreet: 1,
    addressRegistrationStreetCode: 0,
    stacPhone: 2,
    typeWork: 1,
    companyName: 1,
    workPhone: 1,
    companyStart: 1,
    incomeWork: 1,
    paymentCredit: 1
  }

  getStepInfo(stepId: formProgressStepsType): StepInfoInterface {
    return this.stepInfo[stepId]
  }

  getFieldPercent(field: string): number {
    return this.fields[field] || 0
  }
}
