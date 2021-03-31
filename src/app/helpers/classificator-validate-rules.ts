import { FormValidators } from './form-validators'

export interface WorkBlockValidatorsInterface {
  addressWork: KladrValidatorsInterface,
  companyName: Array<any>,
  companyView: Array<any>,
  companyStart: Array<any>,
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
        addressWork: ClassificatorValidateRules.kladrAddress(empty),
        companyName: null, companyView: null, companyStart: null,
        workPhone: null
      }
    }

    return {
      addressWork: ClassificatorValidateRules.kladrAddress(empty),
      companyName: [FormValidators.required],
      companyView: [FormValidators.required],
      companyStart: [], // устанавливается отдельно тк завязан на дату рождения
      workPhone: [FormValidators.mobilePhone],
    }
  }
}
