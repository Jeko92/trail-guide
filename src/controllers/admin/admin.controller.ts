import type { Request, Response } from 'express';
import { getAllTrails } from '../../models/trails.model.ts';

const adminController = async (_req: Request, res: Response) => {
  const trails = await getAllTrails();
  res.render('admin/list.njk', {
    title: 'Trail Guide - Admin Dashboard',
    trails
  });
};

export default adminController;
