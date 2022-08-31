import { PartialType } from '@nestjs/mapped-types';
import { CreateGameTwoDto } from './create-game-two.dto';

export class UpdateGameTwoDto extends PartialType(CreateGameTwoDto) {
  id: number;
}
