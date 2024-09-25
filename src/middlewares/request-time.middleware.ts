import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class RequestTimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      console.log(`Request time: ${Date.now() - start}ms`);
    });

    next();
  }
}
