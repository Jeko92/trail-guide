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

export const createTrailApiController = async (
  _req:Request,
  res:Response,
  next:NextFunction
)=>{
  try {
    console.log('Create new trail API Controller');
    res.status(201).json({message: "New trail successfully created"})
  } catch ( err ) {
    next(err);
  }
}

export const patchTrailApiController = async (
  _req:Request,
  res:Response,
  next:NextFunction
)=>{
  try {
    console.log('Patch trail by ID API Controller');
    res.status(200).json({message: "Trail successfully updated"})
  } catch ( err ) {
    next(err);
  }
}

export const deleteTrailApiController = async (
  _req:Request,
  res:Response,
  next:NextFunction
)=>{
  try {
    console.log('Delete trail by ID API Controller');
    res.status(204).json({message: "Trail successfully deleted"})
  } catch ( err ) {
    next(err);
  }
}
