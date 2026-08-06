import type { Request, Response, NextFunction } from 'express';

export async function logger(req: Request, _res: Response, next: NextFunction) {
  const { ip, method, originalUrl: url } = req;
  console.log(
    `Basic logger: ${method} ${ip} ${url} ${new Date().toISOString()}`,
  );
  next();
}
