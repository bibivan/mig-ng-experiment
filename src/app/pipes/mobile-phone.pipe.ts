import { Pipe, PipeTransform } from '@angular/core'
import { formattedMobilePhone } from '../helpers/helper'

@Pipe({
  name: 'mobilePhone'
})
export class MobilePhonePipe implements PipeTransform {

  transform(value: string = ''): string {
    return formattedMobilePhone(value)
  }

}
