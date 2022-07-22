import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/app/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  exports: [UserModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService],
})
export class UserModule {}
