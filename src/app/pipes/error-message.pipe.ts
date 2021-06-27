import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  transform(value: object | null | undefined): string {
    if (!value) { return '' }

    return Object.values(value).join('. ')
  }

}
