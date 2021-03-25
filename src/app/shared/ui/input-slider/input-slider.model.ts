export type inputType = 'text' | 'email' | 'password' | 'tel'
export type maskType = 'phone' | 'date' | 'currency'



export interface MaskConfigInterface {
  mask: string,
  prefix?: string,
  suffix?: string,
  thousandSeparator?: string
}
