import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BlogsService } from '../blogs.service';
import { Blog } from '../model/blogs.entity';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blogs.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { Public } from '@/auth/guard/public.decorator';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { User, UserDecorator } from '@/auth/user.decorator';

@Public()
@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  private readonly logger = new Logger(BlogsController.name);
  constructor(private blogsService: BlogsService) { }

  @ApiQuery({ name: 'search', required: false, type: String })
  @Get()
  async getAllBlogs(@Query('search') search: string, @Req() req: Request) {
    this.logger.log(`Getting all blogs, Correlation ID: ${req.headers['x-correlation-id']}`);
    return await this.blogsService.getAllBlogs(search);
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
  @ApiBearerAuth()
  @Post()
  async createBlog(
    @Body() body: CreateBlogDto,
    @User() user: UserDecorator,
  ): Promise<Blog> {
    const reqUserId = user.id;
    return this.blogsService.createBlog(reqUserId, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async updateBlog(
    @Param('id') id: string,
    @Body() blog: UpdateBlogDto,
    @User() user: UserDecorator,
  ) {
    return await this.blogsService.updateBlog(id, user.id, blog);
  }

}
