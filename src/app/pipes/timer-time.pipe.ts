import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'timerTime'
})
export class TimerTimePipe implements PipeTransform {

  transform(value: number = 0): string {
    if (!value) { return '' }

    let seconds = value

    let result = ''
    const minutes = Math.floor(value / 60)
    if (minutes) {
      result += `${ minutes } мин.`
      seconds -= minutes * 60
    }

    result += ` ${ seconds } сек.`

    return result
  }

}
