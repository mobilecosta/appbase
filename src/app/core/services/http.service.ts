import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private http: HttpClient, private api: ApiService) {}

  // GET genérico
  get(url: string, params?: any, headers?: any): Observable<any> {
    const options = { params, headers: headers ? new HttpHeaders(headers) : undefined };
    return this.http.get<any>(url, options);
  }

  // POST genérico
  post(url: string, body: any, params?: any, headers?: any): Observable<any> {
    const options = { params, headers: headers ? new HttpHeaders(headers) : undefined };
    return this.http.post<any>(url, body, options);
  }

  // PUT genérico
  put(url: string, body: any, params?: any, headers?: any): Observable<any> {
    const options = { params, headers: headers ? new HttpHeaders(headers) : undefined };
    return this.http.put<any>(url, body, options);
  }

  // DELETE genérico
  delete(url: string, params?: any, headers?: any): Observable<any> {
    const options = { params, headers: headers ? new HttpHeaders(headers) : undefined };
    return this.http.delete<any>(url, options);
  }
}
