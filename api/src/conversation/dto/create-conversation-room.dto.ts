import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ArrayMinSize,
  MaxLength,
  IsIn,
  MinLength,
} from 'class-validator';

export class CreateConversatioRoomnDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, {
    message: 'Name is too long max: 100 chars',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['public', 'private', 'locked'])
  status: string;

  @IsString()
  @IsOptional()
  @MaxLength(20, {
    message: 'Passsword must be between 6 and 20 characters',
  })
  @MinLength(6, {
    message: 'Passsword must be between 6 and 20 characters',
  })
  password: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  members: string[];
}
