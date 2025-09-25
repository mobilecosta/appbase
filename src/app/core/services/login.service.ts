import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PoStorageService } from '@po-ui/ng-storage';
import { environment } from '../../../environments/environment';

export interface PoLoginForm {
  login: string;
  password: string;
  rememberUser?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private apiUrl = `${environment.apiLoginUrl}${environment.apiLoginUri}`; // <-- Usando environment
  // private apiUrl = '/login';
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storage: PoStorageService
  ) {}

  // Observable para AuthGuard
  isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  // Atualiza estado de login
  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  // Login via API
  login(body: PoLoginForm): Observable<any> {
    return this.http.post<any>(this.apiUrl, body);
  }

  // Logout
  async logout() {
    await this.storage.remove('isLoggedIn');
    await this.storage.remove('username');
    this.setLoggedIn(false);
  }
}
