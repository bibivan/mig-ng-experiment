import { Pipe, PipeTransform } from '@angular/core'

import { numberFormat } from '../helpers/helper'

@Pipe({
  name: 'currencyRub',
})
export class CurrencyRubPipe implements PipeTransform {

  transform(value: number = 0): string {
    if (!value) { return '' }

    return numberFormat(value) + ' ₽'
  }

}
