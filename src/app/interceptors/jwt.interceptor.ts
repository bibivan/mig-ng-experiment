import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
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
    const isApiUrl = request.url.startsWith(environment.apiUrl)
    const token = this.authentication.token

    if (!isApiUrl || !token) {
      return next.handle(request)
    }

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token.toString(),
    })

    request = request.clone({
      headers,
      body: request.body,
    })

    return next.handle(request)
  }
}
