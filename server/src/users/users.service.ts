import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';

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

}
