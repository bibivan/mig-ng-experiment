import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'mobilePhone'
})
export class MobilePhonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) { return '' }
    if (value.length !== 10) { return value }

    return `+7 (${ value.substr(0, 3) }) ${ value.substr(3, 3) }-${ value.substr(6, 2) }-${ value.substr(8, 2) }`
  }

}
