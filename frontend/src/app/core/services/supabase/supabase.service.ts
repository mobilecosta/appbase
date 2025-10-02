import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  signIn(login: string, password: string): import("../../models/user.model").User | PromiseLike<import("../../models/user.model").User | null> | null {
    throw new Error('Method not implemented.');
  }
  signInWithPassword(login: string, password: string): import("../../models/user.model").User | PromiseLike<import("../../models/user.model").User | null> | null {
    throw new Error('Method not implemented.');
  }
   supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_ANON_KEY);
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  // Login usando email e senha
async login(email: string, password: string) {
  // 1. Login no auth.users
  const { data: session, error: authError } = await this.supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) throw new Error('Erro ao logar: ' + authError.message);
  if (!session.user) throw new Error('Usuário não autenticado');

  // 2. Buscar dados da tabela users
  const { data: userProfile, error: profileError } = await this.supabase
    .from('users')
    .select('*')
    .eq('auth_uid', session.user.id)
    .single();

  if (profileError) throw profileError;

  console.log('Dados do usuário:', userProfile);

  return userProfile; // você pode retornar os dados para o componente
}

  // Obter o usuário logado
  async getUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();
    return data.user ?? null;
  }

  // Logout
  async signOut() {
    await this.supabase.auth.signOut();
  }
}
