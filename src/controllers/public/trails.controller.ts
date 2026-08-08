import type { NextFunction, Request, Response } from 'express';
import { getAllTrails } from '../../models/trails.model.ts';
import { getAllRegions } from '../../models/regions.model.ts';

const trailsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { q, region, difficulty, maxDistance } = req.query;
  try {
    const trails = await getAllTrails({
      q: q as string,
      regionSlug: region as string,
      difficulty: difficulty as string,
      maxDistance: maxDistance as string,
    });
    const regions = await getAllRegions();
    res.render('public/trails.njk', {
      title: `Trail Guide - All Trails`,
      trails,
      regions,
      filters: { q, region, difficulty, maxDistance },
    });
  } catch (err) {
    next(err);
  }
};

export default trailsController;
