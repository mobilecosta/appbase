import { Body, Controller, HttpException, Post } from '@nestjs/common';
import type User from './user';
import { UserRepository } from './user.repository';

@Controller('auth')
export class AuthController {
  constructor(private readonly repo: UserRepository) {}

  @Post('login')
  async login() {
    return 'login';
  }

  @Post('register')
  async register(@Body() user: User) {
    const userExisting = await this.repo.findByEmail(user.email);
    if (userExisting) {
      throw new HttpException('Usuário já existe', 400);
    }
    await this.repo.save({ ...user, role: 'user' }); // salva automaticamente como usuário e não admin
    return { message: 'Usuário registrado com sucesso' };
  }
}
