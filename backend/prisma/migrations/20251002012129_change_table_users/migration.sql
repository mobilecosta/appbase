-- Cria função que dispara quando um usuário é criado em auth.users
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.users (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name');
  return new;
end;
$$;

-- Cria trigger que chama a função sempre que auth.users receber um novo registro
create trigger on_auth_user_created
after insert on auth.users
for each row execute function handle_new_user();
