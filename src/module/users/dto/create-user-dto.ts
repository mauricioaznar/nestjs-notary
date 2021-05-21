import { UserDto } from './user-dto';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto extends UserDto {
  @IsString()
  @MinLength(10)
  password: string;
}
