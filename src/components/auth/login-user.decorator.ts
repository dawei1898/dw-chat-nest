import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { LoginUser } from './login-user';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const loginUser: string = request['loginUser'];
      if (loginUser) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const user: LoginUser = JSON.parse(loginUser);
        return user;
      }
    } catch (e) {
      console.log('parse loginUser error', e);
    }
  },
);
