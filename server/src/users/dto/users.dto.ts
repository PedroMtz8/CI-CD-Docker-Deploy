import { IsNotEmpty, IsString, MinLength, IsEmail, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(36)
  id: string;
}