import { FormValidators } from './form-validators'

export interface WorkBlockValidatorsInterface {
  companyName: Array<any> | null,
  companyStart: Array<any> | null,
  incomeWork: Array<any> | null,
  paymentCredit: Array<any> | null,
  workPhone: Array<any> | null,
}

export interface KladrValidatorsInterface {
  flat: Array<any> | null,
  home: Array<any> | null,
  korp: Array<any> | null,
  punkt: Array<any> | null,
  punktCode: Array<any> | null,
  region: Array<any> | null,
  str: Array<any> | null,
  street: Array<any> | null,
  streetCode: Array<any> | null,
}

export class ClassificatorValidateRules {
  static kladrAddress(empty = false): KladrValidatorsInterface {
    if (empty) {
      return {
        region: null, punkt: null, punktCode: null, street: null, streetCode: null,
        home: null, flat: null, korp: null, str: null,
      }
    }

    return {
      region: [FormValidators.required],
      punkt: [],
      punktCode: [FormValidators.required],
      street: [FormValidators.required],
      streetCode: [],
      home: [FormValidators.required, FormValidators.numberRus],
      flat: [FormValidators.numberRus],
      korp: [],
      str: [],
    }
  }

  static workBlock(empty = false): WorkBlockValidatorsInterface {
    if (empty) {
      return {
        companyName: null,
        companyStart: null,
        incomeWork: null,
        paymentCredit: null,
        workPhone: null,
      }
    }

    return {
      companyName: [FormValidators.required],
      companyStart: [], // устанавливается отдельно тк завязан на дату рождения
      incomeWork: [FormValidators.money(0)],
      paymentCredit: [FormValidators.money(0)],
      workPhone: [FormValidators.mobilePhone],
    }
  }
}
