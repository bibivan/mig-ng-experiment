import { of, throwError } from 'rxjs'

export class AppApiMockup {
  static initOrderForm = {
    success: {
      order: {}
    },
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static checkPhone = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }

  static saveAnketa = {
    success: {},
    error: throwError({ RESULT_CODE: 'ERROR' })
  }
}
