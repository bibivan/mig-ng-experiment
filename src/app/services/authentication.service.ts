import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { ApiInterface } from './api.model'
import { ApiService } from './api.service'
import { AuthenticationMockup } from './authentication.mockup'
import {
  GetTokenResponseInterface,
  RefreshTokenRequestInterface,
  RefreshTokenResponseInterface
} from './authentication.model'
import { getMockup } from './get-mockup'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string = ''
  private countRefreshToken = 0
  private refreshTokenTimeout!: any

  constructor(
    private api: ApiService
  ) { }

  getToken(): Observable<GetTokenResponseInterface> {
    const requestData: ApiInterface = {
      path: '/getToken',
      mockupData: getMockup('/getToken', AuthenticationMockup.getToken.success),
    }

    return this.api.get(requestData).pipe(
      tap((data: GetTokenResponseInterface) => {
        this.setToken(data.token, data.refreshToken)
        return data
      }),
    )
  }

  refreshToken(): Observable<RefreshTokenResponseInterface | null> {
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) {
      localStorage.setItem('logout-event', 'logout-' + Math.random())
      return of(null)
    }

    this.countRefreshToken++

    const body: RefreshTokenRequestInterface = { refreshToken }

    const requestData: ApiInterface = {
      path: '/refreshToken',
      mockupData: getMockup('/refreshToken', AuthenticationMockup.refreshToken.success, body),
      body,
    }

    return this.api.post(requestData)
      .pipe(
        map((data: RefreshTokenResponseInterface) => {
          this.setToken(data.token, data.refreshToken)
          return data
        }),
        catchError((error) => {
          return throwError(error)
        }),
      )
  }

  deleteToken(): void {
    this.token = ''
    localStorage.removeItem('refresh_token')
  }

  private setToken(token: string, refreshToken: string): void {
    this.token = token
    localStorage.setItem('refresh_token', refreshToken)

    this.startRefreshTokenTimer()
  }

  private startRefreshTokenTimer(): void {
    if (this.refreshTokenTimeout) {
      this.stopRefreshTokenTimer()
    }

    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), 60000)
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout)
  }

}
