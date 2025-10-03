# App Base Angular + PO-UI

Estrutura de aplicativo - Mecanismo de Login (Autenticação), Crud de Usuários e Formulários de Clientes Modelo

## BackEnd
https://github.com/luizsoliveira/jetstarter-secure-api-postgrest

###
## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

* **Node.js:** versão 20 ou superior
* **npm:** versão 9 ou superior
* **Angular CLI:** versão 19

> Verifique as versões instaladas com:
>
> ```bash
> node -v
> npm -v
> ng version
> ```

## 1 Clonar e instalar

```bash
git clone <seu-repo-url>
cd <nome-do-projeto>
npm install
```

## 2 Rodar backend fake (JSON Server)

```bash
npm run fake-api
```

* API: `http://localhost:3000`
* Rotas principais:

  * **POST /login** → Autentica usuário (retorna token)
  * **GET /users** → Lista usuários
  * **GET /contracts** → Lista contratos (protegida)

## 3 Rodar frontend Angular

```bash
npm start
```

* Abra no navegador: `http://localhost:4200`
* Faça login com o usuário do `db.json`

## 4 Observações rápidas

* Token e usuário logado são armazenados no **PO Storage**.
* Avatar e email vêm do `db.json`.
* Rotas protegidas exigem token válido.
* Logout limpa token e usuário automaticamente.

teste