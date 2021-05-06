import { Subscription } from 'rxjs'
import { TermLoanInterface } from '../shared/calculator/calculator.model'
import { KladrAddressInterface } from '../shared/kladr-address/kladr-address.model'

export type appPagesType =
  'preloader'
  | 'anketa'
  | 'sms'
  | 'passport'
  | 'employment_and_income'
  | 'personal_info'
  | 'products'
  | 'snils'
  | 'contract'
  | 'final'

export interface AppStateInterface {
  anketaSMS: SMSSettingsInterface
  isInit: boolean,
  isOpenPersonalAccountHint: boolean,
  isOpenToastAnketaSMS: boolean,
  order: OrderInterface,
  page: appPagesType,
  status: string,
}

export interface ABTestInterface {
  [key: string]: ABTestItemInterface
}

export interface ABTestItemInterface {
  Value: string | number,
  Way: 'A' | 'B'
}

export interface OrderInterface {
  ABTest: ABTestInterface,
  action: string,
  address: {
    Fact: KladrAddressInterface,
    Registration: KladrAddressInterface,
    // Work: KladrAddressInterface,
  },
  bankrupt: boolean,
  codePassport: string,
  companyName: string,
  companyStart: string,
  companyView: string,
  contactsName: string,
  contactsPhone: string,
  contactsStatus: string,
  dateBirthday: string,
  datePassport: string,
  education: string,
  email: string,
  familyStatus: string,
  incomeAdd: number,
  incomeWork: number,
  lastname: string,
  liveRegFlag: boolean
  mobilePhone: string,
  name: string,
  numberChild: number,
  numberPassport: string,
  orderStatus: string,
  patronymic: string,
  paymentCredit: number,
  placeBirthday: string,
  prevLastname: string,
  serialPassport: string,
  sex?: string,
  sum: number,
  snils: string,
  term: TermLoanInterface,
  stacPhone: string,
  typeWork: string,
  wherePassport: string,
  workPhone: string,
}

export interface SMSSettingsInterface {
  code: string,
  limit: boolean,
  seconds: number,
}

