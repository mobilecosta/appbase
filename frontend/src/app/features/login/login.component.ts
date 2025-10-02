import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  PoPageLogin,
  PoPageLoginLiterals,
  PoPageLoginModule,
} from '@po-ui/ng-templates';

interface PoLoginForm {
  login: string;
  password: string;
}
import { PoNotificationService } from '@po-ui/ng-components';
import { LoginSupabaseService } from '../../core/services/supabase/loginSupabase.service';
// import { LoginService, PoLoginForm } from '../../core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, PoPageLoginModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: PoLoginForm = {
    login: '',
    password: '',
  };

  literals: PoPageLoginLiterals = {
    welcome: 'Bem-vindo ao Sistema de Gestão de Notas',
    registerUrl: 'Configurações Avançadas',
    rememberUser: 'Lembrar usuário',
    loginLabel: 'Usuário',
    loginPlaceholder: 'Insira seu usuário de acesso',
    passwordLabel: 'Senha',
    passwordPlaceholder: 'Insira sua senha de acesso',
  };

  constructor(
    private loginSupabaseService: LoginSupabaseService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  // Evento disparado pelo PoPageLogin
  // onLogin(event: PoLoginForm) {
  //   this.loginService.login(event).subscribe({
  //     next: (res) => {
  //       if (res.success) {
  //         this.poNotification.success('Login realizado com sucesso!');
  //         this.router.navigate(['/dashboard']); // redireciona após login
  //       } else {
  //         this.poNotification.error('Usuário ou senha inválidos!');
  //       }
  //     },
  //     error: () => this.poNotification.error('Erro ao tentar logar!'),
  //   });
  // }

   async onLoginSubmit(event: { login: string; password: string }) {
    const { login, password } = event;
    console.log('Login:', event.login);
    console.log('Senha:', event.password);

    try {
      const user = await this.loginSupabaseService.signIn(login, password);
      console.log('Usuário logado:', user);
      // Aqui você pode redirecionar ou armazenar o user na store
    } catch (err: any) {
      console.error('Erro ao logar:', err);
      alert(err.message);
    }
  }
}
