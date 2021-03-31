import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'termLoan'
})
export class TermLoanPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null
  }

}
