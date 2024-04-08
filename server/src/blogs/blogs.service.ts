import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './model/blogs.entity';
import { Like, Repository } from 'typeorm';
import { User } from '@/users/models/users.entity';
import { CreateBlogDto, UpdateBlogDto } from './dto/blogs.dto';

@Injectable()
export class BlogsService {

  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  /**
   * Method is used to get all blogs
  */
  // params commented out for now, will be used later
  async getAllBlogs(search?: string/* page: number = 1, pageSize: number = 10 */) {

    if (search) {
      return this.searchBlogs(search);
    }

    const blogs = await this.blogRepository.find({
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          id: true,
          username: true,
        },
      },
      // skip: (page - 1) * pageSize,
      // take: pageSize,
      order: {
        createdAt: 'DESC', // or 'ASC' for ascending order
      },
    })

    return {
      message: 'Blog list',
      total: blogs.length,
      blogs,
    };
  }

  /** 
   * Method is used to get blog by id
   * @param id - string
  */

  async getBlogById(id: string) {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          id: true,
          username: true,
        }
      }
    })

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return {
      message: 'Blog details',
      blog
    };
  }

  /**
   * Method is used to search blogs
   * @param query - string
  */

  async searchBlogs(query: string) {

    const blogs = await this.blogRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { content: Like(`%${query}%`) },
        { author: { username: Like(`%${query}%`) } },
      ],
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          id: true,
          username: true,
        }
      }
    })

    return {
      message: 'Search results',
      total: blogs.length,
      blogs,
    };
  }

  /**
   * Method is used to create a new blog
   * @param userId - string
   * @param title - string
   * @param content - string
  */

  async createBlog(userId: string, blogDto: CreateBlogDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newBlog = this.blogRepository.create({
      ...blogDto,
      author: user,
    });

    return this.blogRepository.save(newBlog);
  }

  /**
   * Method is used to update a blog
   * @param id - string
   * @param userId - string
   * @param updateBlogDto - UpdateBlogDto
  */

  async updateBlog(id: string, userId: string, updateBlogDto: UpdateBlogDto) {
    const blogFound = await this.blogRepository.findOne({
      where: { id },
      relations: ['author']
    }
    );

    if (!blogFound) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND)
    }

    if (blogFound.author.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this blog');
    }

    Object.assign(blogFound, updateBlogDto);

    const blog = await this.blogRepository.save(blogFound)
    return {
      message: 'Blog updated successfully',
      blog
    };
  }

}
