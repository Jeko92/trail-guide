import type { NextFunction, Request, Response } from 'express';
import { getTrailBySlug } from '../../models/trails.model.ts';
import type { TrailViewModel } from '../../types/types.ts';
import { formatDate } from '../../utils/utils.ts';

const trailController = async (
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const trail= await getTrailBySlug(req.params.slug);

    if (!trail) {
      res.status(404).render('public/404.njk', { title: 'Trail not found' });
      return;
    }

    const trailWithTimestamp: TrailViewModel = {
      ...trail,
      createdAt: formatDate(trail.created_at),
    };

    res.render('public/trail.njk', {
      title: `Trail Guide - ${trail.title}`,
      trail: trailWithTimestamp
    });
  } catch (err) {
    next(err);
  }
};

export default trailController;
