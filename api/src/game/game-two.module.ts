import { Module } from '@nestjs/common';
import { GameTwoService } from './game-two.service';
import { GameTwoGateway } from './game-two.gateway';

@Module({
  providers: [GameTwoGateway, GameTwoService],
})
export class GameTwoModule {}
