import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CheckPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID('all', { message: 'Invalid conversation id' })
  conversationId: string;
}
