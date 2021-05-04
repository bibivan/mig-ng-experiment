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
    address: {
      Fact: {
        flat: 1,
        home: 1,
        korp: 0,
        punkt: 0,
        punktCode: 1,
        region: 1,
        str: 0,
        street: 1,
        streetCode: 0,
      },
      Registration: {
        flat: 1,
        home: 1,
        korp: 0,
        punkt: 0,
        punktCode: 1,
        region: 2,
        str: 0,
        street: 1,
        streetCode: 0,
      },
    },
    stacPhone: 2,
    liveRegFlag: 5,
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
