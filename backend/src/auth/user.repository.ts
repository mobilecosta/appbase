import { Injectable } from '@nestjs/common';
import {User} from '@appbase/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id ?? -1 },
      update: user,
      create: user as any,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
