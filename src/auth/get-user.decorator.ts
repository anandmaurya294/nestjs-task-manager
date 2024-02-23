import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    // The host.switchToHttp() helper call returns an HttpArgumentsHost object that is appropriate for the HTTP application context.
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
