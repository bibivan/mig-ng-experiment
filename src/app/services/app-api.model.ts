import { TermLoanInterface } from '../shared/calculator/calculator.model'
import { KladrAddressInterface } from '../shared/kladr-address/kladr-address.model'
import { ABTestInterface, OrderInterface, productListType } from './app.model'

export interface InitOrderFormResponseInterface {
  order: OrderInterface
}

export interface CheckPhoneRequestInterface {
  phone: string
}

export interface CheckPhoneResponseInterface {
  order: {
    status: string
  },
  promotions?: boolean,
}

export interface SaveAnketaRequestInterface {
  ABTest: ABTestInterface,
  accept: boolean,
  bankrupt: boolean,
  cessionAllowed: boolean,
  dateBirthday: string,
  email: string,
  lastname: string,
  mobilePhone: string,
  name: string,
  patronymic: string,
  sum: number,
  term: TermLoanInterface
}

export interface SendSMSResponseInterface {
  order: {
    status: string // 2.3 - COUCA_2_3 -> limit
  },
  repeatSendSMS?: boolean,
  smsSeconds?: number,
}

export interface CheckSMSRequestInterface {
  code: string
}

export interface CheckSMSResponseInterface {
  checkSMS: boolean,
  order: {
    status: string // 2.3 - COUCA_2_3 -> limit
  },
}

export interface SavePassportRequestInterface {
  address: {
    Fact: KladrAddressInterface,
    Registration: KladrAddressInterface,
  },
  codePassport: string,
  datePassport: string,
  liveRegFlag: boolean,
  numberPassport: string,
  placeBirthday: string,
  prevLastname: string,
  serialPassport: string,
  snils: string,
  stacPhone: string,
  wherePassport: string,
}

export interface SaveEmploymentAndIncomeRequestInterface {
  typeWork: string,
  companyName: string,
  workPhone: string,
  companyStart: string,
  incomeWork: string,
  paymentCredit: string
}

export interface SaveAdditionalContactRequestInterface {
  contactsLastname: string,
  contactsName: string,
  contactsPatronymic: string,
  contactsPhone: string,
  contactsStatus: string,
}

export interface GetProductOfferListResponseInterface {
  order: {
    productOfferList: productListType
  }
}

export interface couca_6_9_RequestIntreface {
  checkSMS: boolean,
  order: {
    status: string // 2.3 - COUCA_2_3 -> limit
  },
}
