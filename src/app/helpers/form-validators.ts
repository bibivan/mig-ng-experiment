import { FormControl } from '@angular/forms'

import * as moment from 'moment'

import {
  clearMaskedValue,
  getMomentDate,
  numberFormat,
  validateContractNumber,
  validateDate,
  validateEmail,
  validateMigCardNumber,
  validateMobilePhone,
  validateServiceNumber
} from './helper'

export interface ErrorObject {
  [key: string]: string
}

export class FormValidators {
  static required(control: FormControl): ErrorObject {
    const value = control.value ? control.value.toString().trim() : ''
    if (value === '') {
      return { required: 'Поле обязательно для заполнения' }
    }

    return null
  }

  static requiredCheckbox(control: FormControl): ErrorObject {
    if (!control.value) {
      return { requiredCheckbox: 'Поле обязательно для заполнения' }
    }

    return null
  }

  static password(control: FormControl): ErrorObject {
    const regPass = /^[a-zA-Z0-9]+$/i

    const value = control.value ? control.value.toString().trim() : ''

    if (!value) {
      return { password: 'Латинские буквы, не менее 8 знаков, минимум 1 заглавная буква и 1 цифра' }
    }

    if (
      value.search(regPass) === -1
      || !value.match(/[0-9]+/)
      || !value.match(/[A-Z]+/)
      || value.length < 8
    ) {
      return { password: 'Латинские буквы, не менее 8 знаков, минимум 1 заглавная буква и 1 цифра' }
    }

    return null
  }

  static passwordRepeat(password: string): any {
    return (control: FormControl): ErrorObject => {
      const validatePassword = this.password(control)

      if (validatePassword) {
        return validatePassword
      }

      if (password && control.value !== password) {
        return { compare: `Введенные пароли не совпадают` }
      }

      return null
    }
  }

  static email(control: FormControl): ErrorObject {
    if (control.value && !validateEmail(control.value)) {
      return { email: 'Укажите корректный адрес электронной почты' }
    }

    return null
  }

  static mobilePhone(control: FormControl): ErrorObject {
    if (control.value && !validateMobilePhone(control.value)) {
      return { phone: 'Укажите корректный номер телефона' }
    }

    return null
  }

  static stacPhone(mobilePhoneControl: FormControl): any {
    return (control: FormControl): ErrorObject => {
      if (!control.value) {
        return null
      }

      const stacPhoneValue = clearMaskedValue(control.value)

      if (!validateMobilePhone(stacPhoneValue)) {
        return { stacPhone: 'Укажите корректный номер телефона' }
      }

      const mobilePhoneValue = clearMaskedValue(mobilePhoneControl.value)
      if (stacPhoneValue === mobilePhoneValue) {
        return { stacPhone: 'Данный номер совпадает с мобильным телефоном аккаунта, введите другой номер' }
      }

      return null
    }
  }

  static contractNumber(control: FormControl): ErrorObject {
    const value = control.value
    if (value && !validateContractNumber(value)) {
      return { contractNumber: 'Укажите корректный номер договора' }
    }

    return null
  }

  static makePaymentNumber(control: FormControl): ErrorObject {
    const value = control.value
    const availableValueLength = [10, 11, 13]
    if (!value || !availableValueLength.includes(value.length)) {
      return { contractNumber: 'Укажите корректный номер' }
    }

    if (value.length === 10) {
      if (!validateContractNumber(value) && !validateServiceNumber(value)) {
        return { contractNumber: 'Укажите корректный номер договора или услуги' }
      }
    }

    if (value.length === 11) {
      if (!validateMobilePhone(value.slice(1))) {
        return { contractNumber: 'Укажите корректный номер телефона' }
      }
    }

    if (value.length === 13) {
      if (!validateMigCardNumber(value)) {
        return { contractNumber: 'Укажите корректный номер карты МигКредит' }
      }
    }

    return null
  }

  static money(min: number = 0, max: number = 9999999999): any {
    return (control: FormControl): ErrorObject => {
      const value = +control.value
      if (value < min) {
        return { money: `Минимальная сумма операции - ${ numberFormat(min) } ₽` }
      }

      if (value > max) {
        return { money: `Максимальная сумма операции - ${ numberFormat(max) } ₽` }
      }

      return null
    }
  }

  static kladr(code: string): any {
    return (): ErrorObject => {
      if (!code) {
        return { compare: `Выберите вариант из списка` }
      }

      return null
    }
  }

  static date(control: FormControl): ErrorObject {
    const value = control.value ? control.value.toString().trim() : ''

    if (!value) {
      return null
    }

    if (!validateDate(value)) {
      return { date: 'Дата в формате дд.мм.гггг' }
    }

    const dateMoment = getMomentDate(value)

    if (dateMoment.isValid() === false) {
      return { date: 'Укажите верную дату' }
    }

    return null
  }

  static dateBirthday(control: FormControl): ErrorObject {
    const value = control.value ? control.value.toString().trim() : ''
    if (!value) { return null }

    const validateResultDate = FormValidators.date(control)
    if (validateResultDate) {
      return validateResultDate
    }

    const dateCur = getMomentDate(value)
    const dateNow = moment()

    if (dateCur.isValid() === false || dateCur > dateNow) {
      return { date: 'Укажите верную дату' }
    }

    if (dateNow.diff(dateCur, 'years') < 21) {
      return { date: 'Возраст не менее 21 года' }
    }

    return null
  }

  static datePassport(dateBirthdayControl: FormControl): any {
    return (control: FormControl): ErrorObject => {
      const validateDateBirthday = FormValidators.dateBirthday(dateBirthdayControl) || FormValidators.required(dateBirthdayControl)
      if (validateDateBirthday) {
        return { datePassport: 'Укажите корректную дату рождения' }
      }

      const validateDatePassport = FormValidators.date(control)
      if (validateDatePassport) {
        return validateDatePassport
      }

      const dateBirthdayValue = dateBirthdayControl.value.toString()

      const dateBirthdayMoment = getMomentDate(dateBirthdayValue)
      const dateNow = moment()
      const age = dateNow.diff(dateBirthdayMoment, 'years')

      let ageForPassport = 20
      if (age < 20) {
        ageForPassport = 14
      } else if (age >= 20 && age <= 45) {
        ageForPassport = 20
      } else if (age > 45) {
        ageForPassport = 45
      }

      const datePassportMinMoment = dateBirthdayMoment.add(ageForPassport, 'years')
      const datePassportMinText = datePassportMinMoment.format('DD.MM.YYYY')

      const datePassportValue = control.value.toString()
      const datePassportMoment = getMomentDate(datePassportValue)

      const diff = datePassportMoment.diff(dateBirthdayMoment, 'years', true)
      if (diff < 0) {
        return { datePassport: `Дата должна быть не ранее ${ datePassportMinText }` }
      }

      return null
    }
  }

  static dateWorkStart(dateBirthdayControl: FormControl): any {
    return (control: FormControl): ErrorObject => {
      const value = control.value ? control.value.toString().trim() : ''
      if (!value) { return null }

      const validateDateBirthday = FormValidators.dateBirthday(dateBirthdayControl) || FormValidators.required(dateBirthdayControl)
      if (validateDateBirthday) {
        return { dateWorkStart: 'Укажите корректную дату рождения' }
      }

      const dateWorkStartValue = `01.${ control.value }`
      const dateWorkStartControl = new FormControl(dateWorkStartValue)

      const dateNow = moment()
      const dateWorkStartMoment = getMomentDate(dateWorkStartValue)

      if (FormValidators.date(dateWorkStartControl) || dateWorkStartMoment > dateNow) {
        return { dateWorkStart: 'Укажите корректную дату' }
      }

      const dateBirthdayValue = dateBirthdayControl.value.toString()
      const dateBirthdayMoment = getMomentDate(dateBirthdayValue)

      const diff = dateWorkStartMoment.diff(dateBirthdayMoment, 'years', true)

      if (diff < 14) {
        return { dateWorkStart: `Дата не менее 14 лет со дня рождения` }
      }

      return null
    }
  }

  static passportCode(control: FormControl): ErrorObject {
    const regPassportCode = /(\d{3}-\d{3})/
    const value = control.value ? control.value.toString().trim() : ''
    if (value && value.search(regPassportCode) === -1) {
      return { passportCode: 'Укажите корректные данные' }
    }
    return null
  }

  static passportSerialNumber(control: FormControl): ErrorObject {
    const regPassportSerialNumber = /(\d{10})/
    const value = control.value ? control.value.toString().replace(/[-\s]/g, '') : ''
    if (value && value.search(regPassportSerialNumber) === -1) {
      return { passportSerialNumber: 'Укажите корректные данные' }
    }

    return null
  }

  static noneEnglish(control: FormControl): ErrorObject {
    const regNoneEnglish = /[a-zA-Z]/i
    const value = control.value ? control.value.toString().trim() : ''
    if (value && value.search(regNoneEnglish) !== -1) {
      return { noneEnglish: 'Только русские буквы' }
    }

    return null
  }

  static textRus(control: FormControl): ErrorObject {
    const regNameRus = /^[А-Яа-яЁё\-'\s]+$/i
    const value = control.value ? control.value.toString().trim() : ''

    if (!value) { return null }

    if (value.search(regNameRus) === -1 || value.length > 50 || value.length < 2) {
      return { textRus: 'Только русские буквы, до 50 символов' }
    }

    return null
  }

  static numberRus(control: FormControl): ErrorObject {
    const regNumberRus = /^[а-яА-ЯёЁ0-9\-\/]+$/
    const value = control.value.toString()
    if (value && value.search(regNumberRus) === -1) {
      return { noneEnglish: 'Укажите корректное значение' }
    }
    return null
  }
}
