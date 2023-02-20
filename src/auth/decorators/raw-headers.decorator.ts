import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const headers = req.headers;
    if (!headers) {
      throw new InternalServerErrorException('Headers not found');
    }
    return data ? headers[data] : headers;
  },
);
