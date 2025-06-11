/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ManualJwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || 'supersecretkey',
        ) as any;
        req['user'] = {
          id: decoded.sub,
          email: decoded.email,
          role: decoded.role,
        };
      } catch (err) {
        console.warn('❌ Invalid JWT:', err.message);
      }
    }
    next();
  }
}
