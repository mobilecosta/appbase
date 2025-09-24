import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PoPageLoginLiterals, PoPageLoginModule } from '@po-ui/ng-templates';
import { PoNotificationService } from '@po-ui/ng-components';
import { LoginService, PoLoginForm } from '../../core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, PoPageLoginModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

    literals: PoPageLoginLiterals = {
    welcome: 'Bem-vindo ao Sistema de Gestão de Notas',
    registerUrl: 'Configurações Avançadas',
    rememberUser: 'Lembrar usuário',
    loginLabel: 'Usuário',
    loginPlaceholder: 'Insira seu usuário de acesso',
    passwordLabel: 'Senha',
    passwordPlaceholder: 'Insira sua senha de acesso',
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  // Recebe qualquer evento do template
  onLoginEvent(event: unknown) {
    const formData = event as PoLoginForm; // cast seguro
    this.onLogin(formData);
  }

  private onLogin(formData: PoLoginForm) {
    this.loginService.login(formData).subscribe({
      next: res => {
        if (res?.success) {
          this.loginService.setLoggedIn(true);
          this.poNotification.success('Login realizado com sucesso!');
          this.router.navigate(['/dashboard']);
        } else {
          this.poNotification.error('Usuário ou senha inválidos!');
        }
      },
      error: () => this.poNotification.error('Erro ao tentar logar!')
    });
  }
}
