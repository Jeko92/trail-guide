import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorHandler = ( err: ErrorRequestHandler, _req: Request, res: Response, _next:NextFunction) => {
  console.error(err);
  res.status(500).render('public/500.njk', {title: "Internal Server Error"});
};
