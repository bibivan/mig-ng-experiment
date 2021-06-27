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

const orderMockup = {
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
  formAction: '',
  incomeAdd: 10000,
  incomeWork: 15000,
  lastname: 'Кейдж',
  liveRegFlag: false,
  mobilePhone: '9999999999',
  name: 'Константин',
  needIdentifyBy: 8,
  numberChild: 0,
  numberPassport: '682468',
  orderStatus: '',
  patronymic: 'Константинович',
  paymentCredit: 5300,
  paymentKey: 16,
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

export class ApiMockup {
  static initOrderForm = {
    success: {
      order: Object.assign({}, orderMockup)
    },
    successEmpty: {
      order: {} as OrderInterface
    },
    successAppHoldAmmount: {
      order: Object.assign({}, orderMockup, { formAction: 'App_HoldAmmount' })
    },
    successAppSNILSInput: {
      order: Object.assign({}, orderMockup, { formAction: 'App_SNILSInput' })
    },
    successSendSMS: {
      order: Object.assign({}, orderMockup, { action: 'sendSMS' })
    },
    successCheckSMS: {
      order: Object.assign({}, orderMockup, { action: 'checkSMS' })
    },
    successCouca_3_5: {
      order: Object.assign({}, orderMockup, { action: 'couca_3_5' })
    },
    successCouca_3_6: {
      order: Object.assign({}, orderMockup, { action: 'couca_3_6' })
    },
    successSaveEmploymentAndIncome: {
      order: Object.assign({}, orderMockup, { action: 'saveEmploymentAndIncome' })
    },
    successSaveAdditionalContact: {
      order: Object.assign({}, orderMockup, { action: 'saveAdditionalContact' })
    },
    successGetProductOfferList: {
      order: Object.assign({}, orderMockup, { action: 'getProductOfferList' })
    },
    successGetStatusCardRegistration: {
      order: Object.assign({}, orderMockup, { action: 'getStatusCardRegistration' })
    },
    successGetStatusHoldAmount: {
      order: Object.assign({}, orderMockup, { action: 'getStatusHoldAmount' })
    },
    successGetApplicationContract: {
      order: Object.assign({}, orderMockup, { action: 'getApplicationContract' })
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

  static smevIdentity = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  // tslint:disable-next-line:variable-name
  static couca_3_6 = {
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

  // tslint:disable-next-line:variable-name
  static couca_3_7 = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getStatusFullAnketa = {
    success: {
      order: {
        status: '5.0'
      }
    },
    successSNILS: {
      order: {
        status: '5.0.2'
      }
    },
    successFinal: {
      order: {
        status: '4.74', // '99' '3.1' '3.2' '3.3' '4.1' '4.3' '4.5' '4.6' '4.7' '4.74' '4.8' '5.2' '5.3'
        // statusReason: 'APP_NeedCustomerResponse',
      }
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static saveSNILS = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  // tslint:disable-next-line:variable-name
  static couca_5_0_1 = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getStatusSNILS = {
    success: {
      order: {
        status: '5.0'
      }
    },
    successSNILS: {
      order: {
        status: '5.0.2'
      }
    },
    successFinal: {
      order: {
        status: '4.74', // '99' '5.0.4' '5.0.6' '5.11'
      },
      isFinalStatus: true
    },
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

  static coucaProduct = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getStatusProducts = {
    success: {
      order: {
        status: '1.20.1'
      }
    },
    successSNILS: {
      order: {
        status: '5.0.2'
      }
    },
    successFinal: {
      order: {
        status: '5.1', // '99' '5.1' '5.3' '5.11' '6.4' '5.11'
      },
      isFinalStatus: true
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getPNEUrl = {
    success: {
      url: 'https://migcredit.ru/#ariuspay'
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getStatusCardRegistration = {
    success: {
      order: {
        status: '5.4'
      }
    },
    successProducts: {
      order: {
        status: '5.0'
      }
    },
    successHoldAmount: {
      order: {
        status: '1.21'
      }
    },
    successFinal: {
      order: {
        status: '5.11', // '99' '5.1.0' '5.3' '5.11'
      },
      isFinalStatus: true
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static saveHoldAmount = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  // tslint:disable-next-line:variable-name
  static couca_1_31 = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getStatusHoldAmount = {
    success: {
      order: {
        status: '5.4'
      }
    },
    successHoldAmount: {
      order: {
        status: '1.21'
      }
    },
    successFinal: {
      order: {
        status: '5.11', // '99' '5.3' '5.11'
      },
      isFinalStatus: true
    },
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

  // tslint:disable-next-line:variable-name
  static scas_5_6 = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  // tslint:disable-next-line:variable-name
  static scas_5_61 = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  // tslint:disable-next-line:variable-name
  static scas_5_7 = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getStatusSendSMSContract = {
    success: {
      order: {
        status: '5.73'
      }
    },
    successFinal: {
      order: {
        status: '5.11', // '99' '5.11' '5.72'
      },
      isFinalStatus: true
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static getStatusCheckSMSContract = {
    success: {
      order: {
        status: '6.2',
        needIdentifyBy: 8,
        paymentKey: 16
      },
      isFinalStatus: true,
    },
    incorrectSMSCode: {
      order: {
        status: '5.71', // '5.71' '5.73'
      }
    },
    successFinal: {
      order: {
        status: '5.55', // '99' '5.11' '5.5' '5.55' '5.72' '6.2' '6.3' '6.4',
        needIdentifyBy: 8,
        paymentKey: 16
      },
      isFinalStatus: true,
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static checkPromoCode = {
    success: {
      errorText: ''
    },
    successInvalidPromoCode: {
      errorText: 'Промокод не существует'
    }
  }

  static step99 = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }
}
