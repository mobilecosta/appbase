import { Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly prisma: PrismaService) {}
    
    @Post('login')
    async login() {
        return 'login'
    }
}
