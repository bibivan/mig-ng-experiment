import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EMPTY, Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { ApiInterface } from './api.model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private mockup: boolean = environment.mockup
  private apiUrl: string = environment.apiUrl

  constructor(
    private http: HttpClient
  ) {}

  get(data: ApiInterface): Observable<any> {
    if (this.mockup) {
      return data.mockupData || EMPTY
    }

    return this.http.get(this.apiUrl + data.path, { params: data.params })
  }

  post(data: ApiInterface): Observable<any> {
    if (this.mockup) {
      return data.mockupData || EMPTY
    }

    return this.http.post(this.apiUrl + data.path, data.body)
  }

  put(data: ApiInterface): Observable<any> {
    if (this.mockup) {
      return data.mockupData || EMPTY
    }

    return this.http.put(this.apiUrl + data.path, data.body)
  }

  delete(data: ApiInterface): Observable<any> {
    if (this.mockup) {
      return data.mockupData || EMPTY
    }

    return this.http.delete(this.apiUrl + data.path, data.body)
  }
}
