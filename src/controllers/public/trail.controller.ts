import type { NextFunction, Request, Response } from 'express';
import { getTrailBySlug } from '../../models/trails.model.ts';

const trailController = async (
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const trail = await getTrailBySlug(req.params.slug);
    if (!trail) {
      res.status(404).render('public/404.njk', { title: 'Trail not found' });
      return;
    }
    res.render('public/trail.njk', { title: `Trail Guide - ${trail.title}`, trail });
  } catch (err) {
    next(err);
  }
};

export default trailController;
