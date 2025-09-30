import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, switchMap, tap } from 'rxjs';
import { PoStorageService } from '@po-ui/ng-storage';
import { ApiService } from './api.service';

export interface PoLoginForm {
  login: string;
  password: string;
  rememberUser?: boolean;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    login: string;
    name?: string;
    email?: string;
    avatar?: string;
  };
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'user';

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<LoginResponse['user'] | null>(null);

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private storage: PoStorageService
  ) {
    // Inicializa estado do usuário de forma reativa
    this.initUser();
  }

  /** Inicializa usuário e token armazenados via Observables */
  private initUser(): void {
    from(this.storage.get(this.TOKEN_KEY)).pipe(
      switchMap(token => {
        if (token) {
          return from(this.storage.get(this.USER_KEY)).pipe(
            tap(user => {
              if (user) {
                this.loggedInSubject.next(true);
                this.userSubject.next(user);
              }
            })
          );
        } else {
          return from([null]); // não há token, retorna null
        }
      })
    ).subscribe();
  }

  /** Observable para AuthGuard ou componentes */
  isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  /** Observable para UI reagir ao usuário logado */
  user$(): Observable<LoginResponse['user'] | null> {
    return this.userSubject.asObservable();
  }

  /** Login via API */
  login(body: PoLoginForm): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("https://api.freeprojectapi.com/api/UserApp/login", body).pipe(
      tap(res => {
        if (res.success) {
          // Armazena token e usuário
          this.storage.set(this.TOKEN_KEY, res.token);
          this.storage.set(this.USER_KEY, res.user);
          // Atualiza estados dos observables de login e usuário
          this.loggedInSubject.next(true);
          this.userSubject.next(res.user);
        }
      })
    );
  }
// dentro de LoginService
async debugStorage() {
  const token = await this.storage.get('authToken');
  const user = await this.storage.get('user');
  console.log({ token, user });
}

  /** Logout */
  logout(): void {
    from(this.storage.remove(this.TOKEN_KEY)).pipe(
      switchMap(() => from(this.storage.remove(this.USER_KEY))),
      tap(() => {
        this.loggedInSubject.next(false);
        this.userSubject.next(null);
      })
    ).subscribe();
  }
}
