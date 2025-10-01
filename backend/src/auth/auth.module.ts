import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [UserRepository]
})
export class AuthModule {}
