import { User as UserEntity } from '@/users/models/users.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export type UserDecorator = Omit<UserEntity, 'password' | 'createdAt' | 'blogs'>
  & {
    iat: number;
    exp: number;
  };

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);