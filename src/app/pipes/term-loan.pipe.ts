import { Pipe, PipeTransform } from '@angular/core'
import { declOfNum } from '../helpers/helper'
import { TermLoanInterface } from '../shared/calculator/calculator.model'

@Pipe({
  name: 'termLoan'
})
export class TermLoanPipe implements PipeTransform {

  private readonly termLabelsData = {
    Day: ['день', 'дня', 'дней'],
    Month: ['месяц', 'месяца', 'месяцев'],
    Week: ['неделя', 'недели', 'недель'],
  }

  transform(term: TermLoanInterface | undefined): string {
    if (!term) { return '' }

    const { value, termUnit } = term
    const termLabels = this.termLabelsData[termUnit]

    return `${ value } ${ declOfNum(value, termLabels) }`
  }

}
