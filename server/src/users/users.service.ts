import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  /**
   * Method is used to get all users
   * @returns Promise<User[]>
  */

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: [
        "username",
        "email",
        "createdAt",
        "id",
      ]
    });
  }

  /**
 * Method is used to get user by id
 * @param id - string
 */

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return {
      message: 'User details',
      user,
    };
  }

  /**
* Method is used to create a new user	
* @param user - CreateUserDto
* @param user.username - string
* @param user.email - string
*/

  async createUser(user: CreateUserDto) {

    const userFound = await this.userRepository.findOne({
      where: [
        { username: user.username },
        { email: user.email },
      ]
    });
    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT)
    }

    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);

    // Retornar el usuario creado con el código de estado 201 (Created)
    return { message: 'User details', user: savedUser, statusCode: HttpStatus.CREATED };
  }

  /**
 * Method to validate the user
 * @param signInDto 
 * @param signInDto.username - string
 * @param signInDto.password - string
 * @returns  
*/

  async validateUser(signInDto: { username: string; password: string }) {

    const { username, password } = signInDto;

    const foundUser = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // const isPasswordValid = await foundUser.comparePassword(password);
    const isPasswordValid = await compare(password, foundUser.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    delete foundUser.password
    delete foundUser.createdAt

    return foundUser;
  }


  /**
   * Method to update the password
   * @param id - string
   * @param password - string
   */

  async updatePassword(id: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const samePass = await compare(password, user.password);
    if (samePass) {
      throw new HttpException('Password cannot be the same', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await hash(password, 10);

    user.password = hashPassword;
    return this.userRepository.save(user);
  }

}
