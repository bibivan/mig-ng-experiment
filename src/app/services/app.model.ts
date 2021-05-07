import { TermLoanInterface, termUnitType } from '../shared/calculator/calculator.model'
import { KladrAddressInterface } from '../shared/kladr-address/kladr-address.model'

export type appPagesType =
  'preloader'
  | 'anketa'
  | 'sms'
  | 'passport'
  | 'employment_and_income'
  | 'additional_contact'
  | 'products'
  | 'snils'
  | 'contract'
  | 'final'

export interface AppStateInterface {
  anketaSMS: SMSSettingsInterface
  isInit: boolean,
  isOpenInsuranceInfoHint: boolean,
  isOpenInsuranceTermHint: boolean,
  isOpenPersonalAccountHint: boolean,
  isOpenRefusalLoanModal: boolean,
  isOpenSumLoanHint: boolean,
  order: OrderInterface,
  page: appPagesType,
  products: productListType,
  status: string,
  toast: {
    caption: string,
    isOpen: boolean,
    text: string,
  },
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
  contactsLastname: string,
  contactsName: string,
  contactsPatronymic: string,
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

export type productListType = Array<ProductItemInterface>

export interface ProductItemInterface {
  id: string,
  Status: string,
  Amount: number,
  Term: number,
  TermUnit: termUnitType,
  RegularPayment: number,
  PaymentKey: number,
  InsuranceList: productInsuranceListType,
  NeedIdentifyBy: needIdentifyByListType,
}

export type needIdentifyByListType = Array<number>
export type productInsuranceListType = Array<ProductInsuranceItemInterface>

export interface ProductInsuranceItemInterface {
  id: string,
  amount: number
}
