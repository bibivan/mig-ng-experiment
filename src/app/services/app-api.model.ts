import { TermLoanInterface } from '../shared/calculator/calculator.model'
import { KladrAddressInterface } from '../shared/kladr-address/kladr-address.model'
import { ABTestInterface, ContractInterface, OrderInterface, productListType } from './app.model'

export interface GetStatusResponseInterface {
  isFinalStatus: boolean,
  isGetClientLoyaltyStatus?: boolean,
  order: {
    status: string,
    statusReason?: string
  }
}

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

export interface CheckNameRequestInterface {
  name: string
}

export interface CheckNameResponseInterface {
  check: boolean
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

export interface SaveAnketaResponseInterface {
  order?: {
    ucdbId: string
  }
}

export interface GetUcdbIdResponseInterface {
  order: {
    ucdbId: string
  }
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

// tslint:disable-next-line:class-name
export interface Couca_6_9_RequestInterface {
  checkSMS: boolean,
  order: {
    status: string // 2.3 - COUCA_2_3 -> limit
  },
}

export interface SaveProductRequestInterface {
  productId: string,
  insurance: boolean
}

export interface SaveSNILSRequestInterface {
  snils: string,
}

export interface GetApplicationContractResponseInterface {
  order: ContractInterface
}

export interface SaveHoldAmountRequestInterface {
  amount: number,
}
