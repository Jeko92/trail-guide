import type { Request, Response } from 'express';

const homeController = async (_req: Request, res: Response) => {
  res.render('public/home.njk', { title: 'Trail Guide' });
};

export default homeController;
