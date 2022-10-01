import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsIn,
  IsOptional,
  MinLength,
} from 'class-validator';

export class EditRoomDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(100, {
    message: 'Name is too long',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
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
}
