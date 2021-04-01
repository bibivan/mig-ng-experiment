export type appPagesType = 'preloader' | 'anketa' | 'sms' | 'passport' | 'employment_and_income' | 'personal_info' | 'products' | 'snils' | 'contract' | 'final'

export interface AppStateInterface {
  isInit: boolean,
  page: appPagesType,
  status: string,
  order: OrderInterface
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
  accept: boolean,
  bankrupt: boolean,
  cessionAllowed: boolean,
  dateBirthday: string,
  email: string,
  lastname: string,
  mobilePhone: string,
  name: string,
  patronymic: string,
}


