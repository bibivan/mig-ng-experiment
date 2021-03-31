import { Observable, of } from 'rxjs'
import { delay, tap } from 'rxjs/operators'

export function getMockup(
  methodName: string,
  data: any,
  requestData: any = '',
): Observable<any> {
  return of(data).pipe(
    tap((res) => {
      console.log(`Api ${ methodName }()`, requestData)
      console.log(res)
    }),
    delay(Math.random() * 1000),
  )
}
