import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class addNewMemberDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID('all', { message: 'Invalid conversation id' })
  conversationId: string;
}
