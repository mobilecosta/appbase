import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class LoginSupabaseService {
  constructor(private supabaseService: SupabaseService) {}

  // Criar usuário (signUp)
  async signUp(email: string, password: string) {
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data.user; // retorna o usuário criado
  }

  // Login (signIn)
  async signIn(login: string, password: string) {
    // Mostra o que vai ser enviado para o Supabase
    console.log('Tentando logar com:', { login, password });

    const email = login; // mapear login para email
    const { data, error } =
      await this.supabaseService.client.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      console.error('Erro ao logar:', error);
      throw error;
    }
    console.log('Usuário logado:', data.user);
    return data.user; // retorna usuario logado
  }

  // Recuperar usuário atual
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await this.supabaseService.client.auth.getUser();
    if (error) throw error;
    return user;
  }

  // Logout
  async signOut() {
    const { error } = await this.supabaseService.client.auth.signOut();
    if (error) throw error;
  }
}
