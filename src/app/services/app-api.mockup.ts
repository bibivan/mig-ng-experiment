import { throwError } from 'rxjs'
import { KladrAddressInterface } from '../shared/kladr-address/kladr-address.model'
import { OrderInterface, ProductItemInterface } from './app.model'

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
    successEmpty: {
      order: {} as OrderInterface
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

  static checkName = {
    success: {
      check: true
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static saveAnketa = {
    success: {},
    successWithUcdbId: {
      order: {
        ucdbId: '12345'
      }
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  // tslint:disable-next-line:variable-name
  static couca_100 = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getUcdbId = {
    success: {
      order: {
        ucdbId: '12345'
      }
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getStatusAnketa = {
    success: {
      order: {
        status: '3.4'
      }
    },
    successFinal: {
      order: {
        status: '4.74', // '99' '3.1' '3.2' '3.3' '4.1' '4.5' '4.74'
        // statusReason: 'APP_NeedCustomerResponse',
      }
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static sendSMS = {
    success: {
      order: {},
      repeatSendSMS: true,
      smsSeconds: 300,
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

  // tslint:disable-next-line:variable-name
  static couca_2_3 = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  // tslint:disable-next-line:variable-name
  static couca_3_5 = {
    success: {},
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

  static saveProduct = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static saveSNILS = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getApplicationContract = {
    success: {
      order: {
        lastname: 'Кейдж',
        name: 'Им',
        patronymic: 'Отч',
        email: 'email@email.ru',
        mobilePhone: '9876543210',
        insurance: true,
        contract: {
          sum: 35000,
          term: {
            value: 10,
            termUnit: 'Day',
          },
          payment: 2000,
          datePayment: '2021-07-08T00:00:00',
          number: '12345567',
          date: '2021-05-04T00:00:00',
          dateEnd: '2021-12-03T00:00:00',
        }
      }
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static saveHoldAmount = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }
}
