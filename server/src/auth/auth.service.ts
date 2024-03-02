// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { hash } from 'bcrypt';
import { User } from '@/users/models/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  /** 
   * Sign up method
   * @param signUpDto - SignUpDto
   * @param signUpDto.username - string
   * @param signUpDto.email - string
   * @param signUpDto.password - string
   * @returns Promise<User>
  */

  async signUp(signUpDto: SignUpDto) {
    try {

      const { password } = signUpDto;

      // Hash the password
      const hashPassword = await hash(password, 10);

      signUpDto.password = hashPassword;
      const user = await this.usersService.createUser(signUpDto);
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Sign in method
   * @param signInDto - SignInDto
   * @param signInDto.username - string
   * @param signInDto.password - string
   * @returns Promise<{ accessToken: string }>
  */

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string, user: User }> {
    const user = await this.usersService.validateUser(signInDto);
    const payload = { username: user.username, userId: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, user };
  }
}
