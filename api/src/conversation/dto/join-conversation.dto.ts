import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class JoinConversationDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('all', { message: 'Invalid conversation id' })
  conversationId: string;
}
