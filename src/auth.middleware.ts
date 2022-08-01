import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request,Response,NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.verify(token, 'JWT_SECRET');
    if (decoded) {
      return next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }


  }
}
