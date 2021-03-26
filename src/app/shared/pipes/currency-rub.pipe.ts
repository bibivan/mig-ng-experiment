import {
  Pipe,
  PipeTransform
} from '@angular/core'

import { numberFormat } from '../helpers/helper'

@Pipe({
  name: 'currencyRub',
})
export class CurrencyRubPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) { return '' }

    return numberFormat(value) + ' ₽'
  }

}
