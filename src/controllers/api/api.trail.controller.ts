import type { NextFunction, Request, Response } from 'express';
import { getAllTrails, getTrailBySlug } from '../../models/trails.model.ts';
import type { TrailWithRegion } from '../../types/types.ts';

export const getTrailsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const trails:TrailWithRegion[] = await getAllTrails({
      regionSlug: req.query['region'] as string,
      difficulty: req.query['difficulty'] as string
    });
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
