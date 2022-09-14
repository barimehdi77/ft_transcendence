import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [GameGateway, GameService, PrismaClient],
})
export class GameModule {}
