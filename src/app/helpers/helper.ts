import * as sha1 from 'js-sha1'
import * as moment from 'moment'
import { SexByRussianName } from 'sex-by-russian-name'

// import { TermLoanInterface } from '../../core/modules/calculator/calculator.model'
import { selectOptionsType } from '../modules/shared/select/select.model'


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

export function getGenderByFIO(lastname = '', name = '', patronymic = ''): number {
  const sexByRussianName = new SexByRussianName()
  let gender = +sexByRussianName.getSex({
    firstName: name,
    lastName: lastname,
    patronymic
  })
  if (gender === 0) {
    gender = 2
  } else {
    gender = 1
  }

  return gender
}
