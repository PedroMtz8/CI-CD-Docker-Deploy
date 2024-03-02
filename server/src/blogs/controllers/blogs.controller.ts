import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BlogsService } from '../blogs.service';
import { Blog } from '../model/blogs.entity';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blogs.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@/auth/jwt/jwt.guard';

@Controller('blogs')
export class BlogsController {

  constructor(private blogsService: BlogsService) { }

  @Get()
  async getAllBlogs() {
    return await this.blogsService.getAllBlogs();
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    return this.blogsService.getBlogById(id);
  }

  @Get('search')
  async searchBlogs(@Query('query') query: string) {
    if (!query || query.trim() === '') {
      return await this.blogsService.getAllBlogs();
    }
    return await this.blogsService.searchBlogs(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBlog(
    @Body() body: CreateBlogDto,
    @Req() req: Request
  ): Promise<Blog> {
    const reqUserId = req.userData.userId;
    return this.blogsService.createBlog(reqUserId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBlog(
    @Param('id') id: string,
    @Body() blog: UpdateBlogDto,
    @Req() req: Request,
  ) {
    const reqUserId = req.userData.userId;
    return await this.blogsService.updateBlog(id, reqUserId, blog);
  }

}
