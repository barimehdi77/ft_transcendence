import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FortyTwoStrategy } from './strategies/FortyTwo.strategy';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/app/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserModule } from 'src/user/user.module';
import { AppModule } from 'src/app/app.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    FortyTwoStrategy,
    JwtStrategy,
    UserService,
    ConfigService,
    PrismaService,
    PrismaClient,
    CloudinaryService,
  ],
})
export class AuthModule {}
