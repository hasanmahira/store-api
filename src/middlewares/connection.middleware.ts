import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';

@Injectable()
export class ConnectionMiddleware implements NestMiddleware {
  constructor(private dataSource: DataSource) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
    next();
  }
}
