import { TermLoanInterface } from '../modules/shared/calculator/calculator.model'
import { ABTestInterface, OrderInterface } from './app.model'

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
