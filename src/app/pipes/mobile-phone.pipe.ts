import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'mobilePhone'
})
export class MobilePhonePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null
  }

}
