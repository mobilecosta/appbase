import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PoStorageService } from '@po-ui/ng-storage';

@Injectable()
export class TokenHttpInterceptor implements HttpInterceptor {
  private readonly TOKEN_KEY = 'authToken';

  constructor(private storage: PoStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Recupera o token do PoStorageService (retorna Promise)
    return from(this.storage.get(this.TOKEN_KEY)).pipe(
      switchMap(token => {
        // Se existir token, adiciona no header Authorization
        const authReq = token
          ? req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            })
          : req; // caso não tenha token, mantém requisição original

        return next.handle(authReq);
      })
    );
  }
}
