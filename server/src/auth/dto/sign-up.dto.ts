import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';


export class SignUpDto {
  @IsString()
  @IsNotEmpty()
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
