import type { NextFunction, Request, Response } from 'express';
import { getAllTrails } from '../../models/trails.model.ts';

const trailsController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const trails = await getAllTrails();
    if (!trails) {
      res.status(404).render('public/404.njk', { title: 'Trail not found' });
      return;
    }
    res.render('public/trails.njk', {
      title: `Trail Guide - All Trails`,
      trails,
    });
  } catch (err) {
    next(err);
  }
};

export default trailsController;
