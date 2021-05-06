import { FormValidators } from './form-validators'

export interface WorkBlockValidatorsInterface {
  companyName: Array<any>,
  companyStart: Array<any>,
  incomeWork: Array<any>,
  paymentCredit: Array<any>,
  workPhone: Array<any>,
}

export interface KladrValidatorsInterface {
  flat: Array<any>,
  home: Array<any>,
  korp: Array<any>,
  punkt: Array<any>,
  punktCode: Array<any>,
  region: Array<any>,
  str: Array<any>,
  street: Array<any>,
  streetCode: Array<any>,
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
