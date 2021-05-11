import { of, throwError } from 'rxjs'
import { KladrAddressInterface } from '../shared/kladr-address/kladr-address.model'
import { ProductItemInterface } from './app.model'

const productItem: ProductItemInterface = {
  Amount: 10000,
  InsuranceList: [
    { id: '1', amount: 200 },
    { id: '2', amount: 100 },
  ],
  NeedIdentifyBy: [16],
  PaymentKey: 16,
  RegularPayment: 12300,
  Status: 'Offer',
  Term: 10,
  TermUnit: 'Day',
  id: '1'
}

const productsMockup = {
  success: [
    productItem,
    Object.assign({}, productItem, {
      Amount: 12000,
      id: 2,
      InsuranceList: null,
      Term: 22,
    }),
    Object.assign({}, productItem, {
      Amount: 5000,
      id: 3,
      InsuranceList: [
        { id: '3', amount: 150 }
      ],
      Term: 5,
    })
  ],
  empty: null
}

export class AppApiMockup {
  static initOrderForm = {
    success: {
      order: {
        ABTest: null,
        action: '',
        address: {
          Fact: {
            flat: '332',
            home: '6',
            korp: '2',
            punkt: 'Город Москва',
            punktCode: '7700000000000,7700000000000',
            region: '7700000000000',
            str: '1222',
            street: 'БЕСКУДНИКОВСКИЙ БУЛЬВАР',
            streetCode: '0',
            type: 'Fact',
          } as KladrAddressInterface,
          Registration: {
            flat: '1332',
            home: '65',
            korp: '32',
            punkt: 'Город Москва',
            punktCode: '7700000000000,7700000000000',
            region: '7700000000000',
            str: '51222',
            street: 'БЕСКУДНИКОВСКИЙ БУЛЬВАР',
            streetCode: '0',
            type: 'Registration',
          } as KladrAddressInterface,
        },
        bankrupt: true,
        codePassport: '770-015',
        companyName: 'МигКредит',
        companyStart: '10.2015',
        companyView: 'Transportation',
        contactsLastname: 'Петров',
        contactsName: 'Петр',
        contactsPatronymic: 'Петрович',
        contactsPhone: '9876543299',
        contactsStatus: 'Parent',
        dateBirthday: '17.04.1982',
        datePassport: '15.06.2012',
        education: 'Higher',
        email: 'helloworld@mail.ru',
        familyStatus: 'Married Status',
        incomeAdd: 10000,
        incomeWork: 15000,
        lastname: 'Кейдж',
        liveRegFlag: false,
        mobilePhone: '9999999999',
        name: 'Константин',
        numberChild: 0,
        numberPassport: '682468',
        orderStatus: '',
        patronymic: 'Константинович',
        paymentCredit: 5300,
        placeBirthday: 'гор долгопрудный',
        prevLastname: '',
        serialPassport: '4512',
        sex: 'F',
        stacPhone: '9876543213',
        sum: 10000,
        snils: '00000000001',
        term: {
          value: 8,
          termUnit: 'Day'
        },
        typeWork: 'Job',
        wherePassport: 'уфмс россии по гор москве по району бескудниковский',
        workPhone: '9876543211',
      }
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static checkPhone = {
    success: {
      promotions: false,
      order: {
        status: '1'
      }
    },
    successUnfinishedApplication: {
      promotions: false,
      order: {
        status: '114'
      }
    },
    successActiveCurrentAccount: {
      promotions: false,
      order: {
        status: '107'
      }
    },
    successPromotions: {
      promotions: true,
      order: {
        status: '107'
      }
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static saveAnketa = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static sendSMS = {
    success: {
      order: {},
      repeatSendSMS: true,
      smsSeconds: 30,
    },
    successDisableSendSMS: {
      order: {},
      repeatSendSMS: false,
    },
    successLimit: {
      order: {
        status: '2.3'
      },
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static checkSMS = {
    success: {
      checkSMS: true,
      order: {}
    },
    successInvalidCode: {
      checkSMS: false,
      order: {}
    },
    successLimit: {
      checkSMS: false,
      order: {
        status: '2.3'
      }
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static savePassport = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static saveEmploymentAndIncome = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static saveAdditionalContact = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getProductOfferList = {
    success: {
      order: {
        productOfferList: productsMockup.success
      }
    },
    successEmpty: {
      order: {
        productOfferList: productsMockup.empty
      }
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  // tslint:disable-next-line:variable-name
  static couca_6_9 = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }
}
