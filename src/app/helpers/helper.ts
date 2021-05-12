import * as sha1 from 'js-sha1'
import * as moment from 'moment'
import { SexByRussianName } from 'sex-by-russian-name'
import { TermLoanInterface } from '../shared/calculator/calculator.model'

// import { TermLoanInterface } from '../../core/steps/calculator/calculator.model'
import { selectOptionsType } from '../shared/select/select.model'


export const regNum = /^\d+$/

export function validateMobilePhone(value: string): boolean {
  const mobilePhoneInvalidFirstSymbols = ['0', '1', '2', '7']

  const clearValue = clearMaskedValue(value)

  if (!clearValue || clearValue.length !== 10) {
    return false
  }

  if (clearValue.search(regNum) === -1) {
    return false
  }

  if (mobilePhoneInvalidFirstSymbols.includes(clearValue[0])) {
    return false
  }

  return true
}

export function validateContractNumber(value: string): boolean {
  if (!value) { return false }

  if (value.length !== 10 || value.search(regNum) === -1) {
    return false
  }

  return true
}

export function validateServiceNumber(value: string): boolean {
  if (!value) { return false }

  if (value.length !== 10) { return false }

  const firstSymbol = value.substr(0, 1).toLowerCase()
  const otherSymbol = value.slice(1)

  if (firstSymbol !== 's' || otherSymbol.search(regNum) === -1) {
    return false
  }

  return true
}

export function validateMigCardNumber(value: string): boolean {
  if (!value) { return false }

  if (value.length !== 13 || value.search(regNum) === -1) {
    return false
  }

  return true
}

export function validateEmail(value: string): boolean {
  if (!value) { return false }

  const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}$/i
  if (value.search(regEmail) === -1) {
    return false
  }

  return true
}

export function validateDate(value: string): boolean {
  if (!value) { return false }

  const regDate = /(\d{2}\.\d{2}\.\d{4})/
  if (value.search(regDate) === -1) {
    return false
  }

  return true
}

export function clearMaskedValue(value: string): string {
  if (!value) { return '' }

  let result = value

  result = result.replace(/[\s()-]/g, '')
  result = result.replace('+7', '')

  return result
}

export function numberFormat(num: number, decimals = 0, decPoint = '', thousandsSep = ' '): string {
  let i
  let j
  let kw
  let kd
  let km

  i = parseInt((+num || 0).toFixed(decimals), null) + ''
  j = i.length
  if (j > 3) { j = j % 3 } else { j = 0 }

  km = (j ? i.substr(0, j) + thousandsSep : '')
  kw = i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep)
  kd = (decimals ? decPoint + Math.abs(num - i).toFixed(decimals).replace(/-/, '0').slice(2) : '')
  return km + kw + kd
}

export function declOfNum(num: number, titles: Array<string>): string {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]]
}

export function sha1Encode(str = ''): string {
  return sha1(str)
}

export function getDeadlineDate(term: TermLoanInterface): Date {
  if (!term) { return null }

  const deadlineDate = new Date()
  let days = term.value
  if (term.termUnit === 'Week') {
    days = days * 7
  }

  if (term.termUnit === 'Week') {
    days = days + 1
  }
  deadlineDate.setDate(deadlineDate.getDate() + days)

  return deadlineDate
}

export function getSelectOptionName(options: selectOptionsType, id: string): string {
  if (!options || !options.length) {
    return ''
  }

  const resultIndex = options.findIndex(option => option.id === id)
  if (resultIndex !== -1) {
    return options[resultIndex].name
  }

  return ''
}

// Получение случайного целого числа в заданном интервале, включительно
export function getRandomIntegerInclusive(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// определине доступности блока "Работа"
export function isAvailableWorkBlock(value = ''): boolean {
  const availableWorkValues = ['Job', 'Military', 'Informal Work/Temporary jobs', 'Work', 'Working Pensioner']
  return availableWorkValues.includes(value)
}

export function isMarried(value = ''): boolean {
  const isMarriedValues = ['Married Status', 'Widowed']
  return isMarriedValues.includes(value)
}

export function isRequiredStacPhone(value = ''): boolean {
  const isRequiredValues = ['Homemaker/Decree', 'Not Working', 'Student']
  return isRequiredValues.includes(value)
}

// формирование даты Moment из строки дд.мм.гггг
export function getMomentDate(value = ''): moment.Moment {
  if (!value) { return null }

  const dateArray = value.split('.')
  const day = +dateArray[0]
  const month = +dateArray[1] - 1
  const year = +dateArray[2]

  return moment([year, month, day])
}

export function getGenderByFIO(lastname = '', name = '', patronymic = ''): string {
  const sexByRussianName = new SexByRussianName()
  const gender = sexByRussianName.getSex({
    firstName: name,
    lastName: lastname,
    patronymic
  })

  return (gender === 'female') ? 'F' : 'M'
}

/** Получение серии и номера паспорта из одной строки */
export function getSerialAndNumberPassport(value: string): { serialPassport: string, numberPassport: string } {
  let numberPassport = ''
  let serialPassport = ''

  if (value) {
    serialPassport = value.slice(0, 4)
    numberPassport = value.slice(-6)
  }

  return { serialPassport, numberPassport }
}

export function getClearValue(value: string): string {
  let result = ''
  if (value !== '' && value !== undefined && value !== null) {
    result = value.toString().trim()
  }
  return result
}

export function getClearMaskedValue(value: string): string {
  if (!value) { return '' }

  let result = value

  result = result.replace(/[\s()-]/g, '')
  result = result.replace('+7', '')

  return result
}


export function validateSnils(snils: string): boolean {
  if (!snils) { return false }

  const clearSnils = getClearMaskedValue(snils)

  if (clearSnils.search(regNum) === -1 || clearSnils.length !== 11) {
    return false
  }

  if (+clearSnils <= 1001998) {
    return true
  }

  // расчитываем контрольное число
  const snilsArray = clearSnils.split('')
  const snilsDigit = +clearSnils.slice(-2)

  // контрольное число
  let checkDigit = 0

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += +snilsArray[i] * (9 - i)
  }

  if (sum < 100) {
    checkDigit = sum
  } else if (sum > 101) {
    checkDigit = (sum % 101) * 1
  }

  if (checkDigit === 100 || checkDigit === 101) {
    checkDigit = 0
  }

  if (checkDigit !== snilsDigit) { return false }

  return true
}

export function openExternalLink(url: string, target: '_blank' | '_self' = '_blank'): void {
  if (window.location.port === '9876') { return }

  window.open(url, target)
}

export function formattedMobilePhone(mobilePhone: string): string {
  if (!mobilePhone) { return '' }
  const clearMobilePhone = clearMaskedValue(mobilePhone)
  if (clearMobilePhone.length !== 10) { return clearMobilePhone }

  let result = '+7'
  result += ` (${ clearMobilePhone.slice(0, 3) })`
  result += ` ${ clearMobilePhone.slice(3, 6) }`
  result += `-${ clearMobilePhone.slice(6, 8) }`
  result += `-${ clearMobilePhone.slice(8) }`

  return result
}
