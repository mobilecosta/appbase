// src/app/core/services/supabase/loginSupabase.service.ts
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User } from '../../models/user.model'; // ajuste conforme sua estrutura

@Injectable({
  providedIn: 'root',
})
export class LoginSupabaseService {
  constructor(private supabaseService: SupabaseService) {}

  async signIn(login: string, password: string) {
    // Mapeia login -> email na tabela 'users'
    const email = await this.mapLoginToEmail(login);

    const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data.user;
  }

  private async mapLoginToEmail(login: string): Promise<string> {
    const { data, error } = await this.supabaseService.client
      .from('users')
      .select('email')
      .eq('login', login)
      .single();

    if (error || !data?.email) throw new Error('Usuário não encontrado');
    return data.email;
  }
  
  // Recebe login e senha diretamente do PoPageLogin
  async onLoginSubmit(event: { login: string; password: string }) {
    const { login, password } = event;
    try {
      const user = await this.supabaseService.signIn(login, password);
      console.log('Usuário logado:', user);
    } catch (err) {
      console.error('Erro ao logar:', err);
    }
  }
}
