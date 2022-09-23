import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { PrismaClient } from '@prisma/client';
import { GameController } from './game.controller';
import { ProfileService } from 'src/profile/profile.service';
import { PrismaService } from 'src/app/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  providers: [
    GameGateway,
    GameService,
    PrismaClient,
    ProfileService,
    PrismaService,
    UserService,
    JwtService,
    CloudinaryService
  ],
  controllers: [GameController],
})
export class GameModule {}
