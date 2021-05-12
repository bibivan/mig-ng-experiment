import { Observable, of, throwError } from 'rxjs'
import { delay, mergeMap, retryWhen } from 'rxjs/operators'

export const delayedRetryXHR = (delayMs: number) => {

  return (src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => {
          return errors.pipe(
            delay(delayMs),
            mergeMap((response) => {
              if (response?.error === 'REPEAT') {
                return of(response)
              }
              return throwError(response)
            })
          )
        }
      )
    )
}
