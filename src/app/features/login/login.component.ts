import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoModule, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoPageLogin, PoPageLoginAuthenticationType, PoPageLoginLiterals, PoPageLoginModule } from '@po-ui/ng-templates';
import { LoginService } from '../../core/services/login.service';
import { SharedModule } from '../../shared/shared.module';


@Component({
  selector: 'app-login',
  imports: [PoPageModule, PoModule, SharedModule, PoPageLoginModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly authenticationType = PoPageLoginAuthenticationType.Bearer;

  literals: PoPageLoginLiterals = {
    welcome: 'Bem-vindo ao Sistema de Gestão de Notas',
    registerUrl: 'Configurações Avançadas',
    rememberUser: 'Lembrar usuário',
    loginLabel: 'Usuário',
    loginPlaceholder: 'Insira seu usuário de acesso',
    passwordLabel: 'Senha',
    passwordPlaceholder: 'Insira sua senha de acesso',
  };
  

  constructor(
    private loginService: LoginService,
    private router: Router,
    private storage: PoStorageService,
    private poNotification: PoNotificationService
  ) { }

 loginSubmit(formData: PoPageLogin) {
    const user = Object.assign({
      username: formData.login,
      password: formData.password,
    });

    this.loginService.postWithPath("login", user).subscribe(
      () => {
        this.storage.set("isLoggedIn", "true").then(() => {
          this.router.navigate(["/"]);
        });
      },
      () => {
        this.poNotification.error(
          "Invalid username or password. Please try again."
        );
      }
    );
  }
  // login(event: any) {
  //   if (event.login === 'admin' && event.password === '123456') {
  //     const profile = { name: 'Joaquim Martins'};
  //     const profiBase64 = btoa(JSON.stringify(profile));
  //     this.storageService.setToken(profiBase64);
  //     this.router.navigate(['/dashboard']);
  //   }
  // }
}
