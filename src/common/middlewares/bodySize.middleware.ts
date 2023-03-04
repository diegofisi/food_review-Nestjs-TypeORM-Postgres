import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BodySizeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const limit = 4 * 1024 * 1024; // 4MB;
    if (req.is('json')) {
      if (
        req.body &&
        Object.keys(req.body).length > 0 &&
        Buffer.byteLength(JSON.stringify(req.body), 'utf8') > limit
      ) {
        return res
          .status(413)
          .send(`Request entity too large (limit: ${limit})`);
      }
    }
    next();
  }
}
