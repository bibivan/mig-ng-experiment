import { Pipe, PipeTransform } from '@angular/core'
import { declOfNum } from '../helpers/helper'
import { TermLoanInterface } from '../modules/calculator/calculator.model'

@Pipe({
  name: 'termLoan'
})
export class TermLoanPipe implements PipeTransform {

  transform(term: TermLoanInterface): string {
    if (!term) { return '' }

    const { value, termUnit } = term
    const termLabels = termUnit === 'week' ? ['неделя', 'недели', 'недель'] : ['день', 'дня', 'дней']

    return `${ value } ${ declOfNum(value, termLabels) }`
  }

}
