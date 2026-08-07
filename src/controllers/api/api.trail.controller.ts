import type { NextFunction, Request, Response } from 'express';
import { getAllTrails, getTrailBySlug } from '../../models/trails.model.ts';

export const getTrailsController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const trails = await getAllTrails();
    res.json(trails);
  } catch ( err ) {
    next(err);
  }
};

export const getTrailBySlugController = async (
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const trail = await getTrailBySlug(req.params.slug);

    if ( !trail ) {
      res.status(404).json({ error: 'Trail not found' });
      return;
    }

    res.json(trail);
  } catch ( err ) {
    next(err);
  }
};
