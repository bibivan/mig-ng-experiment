export type inputType = 'text' | 'email' | 'password' | 'tel'
export type maskType =
  'phone'
  | 'stacPhone'
  | 'date'
  | 'dateMonthYear'
  | 'currency'
  | 'serialNumberPassport'
  | 'codePassport'
  | 'snils'

export interface MaskConfigInterface {
  mask: string,
  prefix?: string,
  suffix?: string,
  thousandSeparator?: string
}
