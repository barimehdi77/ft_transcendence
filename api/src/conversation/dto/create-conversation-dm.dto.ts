import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDmDto {
  @IsString()
  @IsNotEmpty()
  user: string;
}
