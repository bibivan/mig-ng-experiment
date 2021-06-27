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
  | 'hold_amount'
  | 'contract'
  | 'final'

export interface AppStateInterface {
  anketaSMS: SMSSettingsInterface | null,
  contract: ContractInterface | null,
  contractSMS: ContractSigningInterface | null,
  isInit: boolean,
  openModal: modalsType | null,
  order: OrderInterface | null,
  page: appPagesType | null,
  products: productListType | null,
  status: string,
  statusReason: string,
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
  address?: {
    Fact: KladrAddressInterface,
    Registration: KladrAddressInterface,
  },
  bankrupt?: boolean,
  codePassport?: string,
  companyName?: string,
  companyStart?: string,
  companyView?: string,
  contactsLastname?: string,
  contactsName?: string,
  contactsPatronymic?: string,
  contactsPhone?: string,
  contactsStatus?: string,
  dateBirthday?: string,
  datePassport?: string,
  education?: string,
  email?: string,
  familyStatus?: string,
  formAction?: string,
  incomeAdd?: number,
  incomeWork?: number,
  lastname?: string,
  liveRegFlag?: boolean
  mobilePhone?: string,
  name?: string,
  needIdentifyBy?: number,
  numberChild?: number,
  numberPassport?: string,
  orderStatus?: string,
  patronymic?: string,
  paymentCredit?: number,
  paymentKey?: number,
  placeBirthday?: string,
  prevLastname?: string,
  serialPassport?: string,
  sex?: string,
  snils?: string,
  stacPhone?: string,
  status?: string,
  statusReason?: string,
  sum?: number,
  term?: TermLoanInterface,
  typeWork?: string,
  ucdbId?: string,
  wherePassport?: string,
  workPhone?: string,
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

export interface ContractInterface {
  contract: {
    date: string,
    dateEnd: string,
    datePayment: string,
    number: string,
    payment: number,
    sum: number,
    term: TermLoanInterface,
  },
  email: string,
  insurance: boolean,
  lastname: string,
  mobilePhone: string,
  name: string,
  patronymic: string,
}

export interface ContractSigningInterface {
  code: string,
  seconds: number,
  countSendSMS: number
}

export type modalsType = 'insurance_info' | 'insurance_term' | 'personal_account' | 'refusal_loan' | 'sum_loan'
