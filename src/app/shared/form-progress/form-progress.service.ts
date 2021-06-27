import { Injectable } from '@angular/core'
import { formProgressControlListInterface, formProgressStepsType, StepInfoInterface } from './form-progress.model'

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
    additional_contact: {
      num: 4,
      minPercent: 81,
      maxPercent: 86,
      nextStepPercent: 0
    },
  }

  private readonly fields = {
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
    codePassport: 4,
    companyName: 1,
    companyStart: 1,
    contactsLastname: 1,
    contactsName: 1,
    contactsPatronymic: 1,
    contactsPhone: 1,
    contactsStatus: 1,
    dateBirthday: 8,
    datePassport: 4,
    email: 7,
    incomeWork: 1,
    lastname: 5,
    mobilePhone: 10,
    name: 5,
    patronymic: 5,
    paymentCredit: 1,
    placeBirthday: 0,
    prevLastname: 0,
    serialNumberPassport: 4,
    snils: 10,
    stacPhone: 2,
    typeWork: 1,
    wherePassport: 0,
    workPhone: 1,
  }

  getStepInfo(stepId: formProgressStepsType): StepInfoInterface {
    return this.stepInfo[stepId]
  }

  getFieldPercent(field: string): number {
    // @ts-ignore
    return this.fields[field] || 0
  }

  getFormStepPercent(fields: formProgressControlListInterface): number {
    return fields.reduce((percent, item) => {
      if (item.control.valid) {
        return percent + this.getFieldPercent(item.id)
      }
      return percent
    }, 0)
  }
}
