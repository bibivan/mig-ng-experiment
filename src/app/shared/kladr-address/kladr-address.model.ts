export type kladrAddressType = 'Registration' | 'Fact' | 'Work'

export interface KladrAddressInterface {
  type: kladrAddressType
  region: string,
  punkt: string,
  punktCode: string,
  street: string,
  streetCode: string,
  home: string,
  flat?: string,
  korp?: string,
  str?: string
}
