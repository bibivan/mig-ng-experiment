import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthenticationService } from '../services/authentication.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authentication: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.authentication.token
    let headers: HttpHeaders
    if (token) {
      headers = new HttpHeaders({
        Authorization: 'Bearer ' + token.toString(),
      })
    }

    request = request.clone({
      headers,
      body: request.body,
    })

    return next.handle(request)
  }
}
