import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './controllers/blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './model/blogs.entity';
import { User } from '@/users/models/users.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Blog]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [BlogsService],
  controllers: [BlogsController]
})
export class BlogsModule { }
