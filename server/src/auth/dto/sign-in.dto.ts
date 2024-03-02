import { IsNotEmpty, IsString, MinLength } from 'class-validator';


export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
