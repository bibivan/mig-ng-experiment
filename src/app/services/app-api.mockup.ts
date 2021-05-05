import { of, throwError } from 'rxjs'

export class AppApiMockup {
  static initOrderForm = {
    success: {
      order: {
        ABTest: null,
        action: '',
        // address: {
        //   Fact: {
        //     flat: '332',
        //     home: '6',
        //     korp: '2',
        //     punkt: 'Город Москва',
        //     punktCode: '7700000000000,7700000000000',
        //     region: '7700000000000',
        //     str: '1222',
        //     street: 'БЕСКУДНИКОВСКИЙ БУЛЬВАР',
        //     streetCode: '0',
        //     type: 'Fact',
        //   } as KladrAddressInterface,
        //   Registration: {
        //     flat: '1332',
        //     home: '65',
        //     korp: '32',
        //     punkt: 'Город Москва',
        //     punktCode: '7700000000000,7700000000000',
        //     region: '7700000000000',
        //     str: '51222',
        //     street: 'БЕСКУДНИКОВСКИЙ БУЛЬВАР',
        //     streetCode: '0',
        //     type: 'Registration',
        //   } as KladrAddressInterface,
        //   Work: {
        //     flat: '2',
        //     home: '6',
        //     korp: '32',
        //     punkt: 'Город Москва',
        //     punktCode: '7700000000000,7700000000000',
        //     region: '7700000000000',
        //     str: '1',
        //     street: 'БЕСКУДНИКОВСКИЙ БУЛЬВАР',
        //     streetCode: '0',
        //     type: 'Work',
        //   } as KladrAddressInterface,
        //   // Work: {
        //   //   flat: '',
        //   //   home: '',
        //   //   korp: '',
        //   //   punkt: '',
        //   //   punktCode: '',
        //   //   region: '',
        //   //   str: '',
        //   //   street: '',
        //   //   streetCode: '',
        //   //   type: 'Work',
        //   // } as KladrAddressInterface,
        // },
        bankrupt: true,
        codePassport: '770-015',
        companyName: 'МигКредит',
        companyStart: '10.2015',
        companyView: 'Transportation',
        contactsName: 'Петров Петр',
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
}
