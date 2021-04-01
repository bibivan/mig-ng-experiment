import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  transform(value: object): string {
    if (!value) { return '' }

    return Object.values(value).join('. ')
  }

}
