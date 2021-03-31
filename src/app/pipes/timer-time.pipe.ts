import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'timerTime'
})
export class TimerTimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null
  }

}
