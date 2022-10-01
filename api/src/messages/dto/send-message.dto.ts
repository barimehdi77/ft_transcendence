import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class SendMessageDto {
  sent_by: number;

  @IsUUID('all', { message: 'Invalid conversation id' })
  @IsString()
  @IsNotEmpty()
  conversationId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200, { message: 'Message is too long, max is 200 chars' })
  body: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
