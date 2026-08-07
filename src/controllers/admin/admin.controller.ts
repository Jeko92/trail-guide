import type { Request, Response } from 'express';
import { addTrail, getAllTrails } from '../../models/trails.model.ts';
import { formatDate, sanitizePostContent } from '../../utils/utils.ts';
import { addRegion, getAllRegions } from '../../models/regions.model.ts';

export const adminController = async ( _req: Request, res: Response ) => {
  const trails = await getAllTrails();
  const sanitizedTrails = trails.map(( trail ) => ({
      ...trail,
      description: sanitizePostContent(trail.description),
      createdAt: formatDate(trail.created_at)
    })
  );

  res.render('admin/list.njk', {
    title: 'Trail Guide - Admin Dashboard',
    trails: sanitizedTrails
  });
};

export const getNewTrailForm = async ( _req: Request, res: Response ) => {
  const regions = await getAllRegions();
  res.render('admin/form.njk', { title: 'Trail Guide - Create new trail', regions });
};

export const createTrail = async ( req: Request, res: Response ) => {
  const {
    region_id,
    new_region_name,
    new_region_country,
    new_region_description,
    title,
    difficulty,
    distance,
    description,
    image_url
  } = req.body;

  if ( !title ) {
    res.status(400).send('Title is required');
    return;
  }

  if(!['easy', 'moderate', 'hard'].includes(difficulty)){
    res.status(400).send('Choose trail difficulty');
    return;
  }

  const distanceKm = Number(distance);
  if(!distance || Number.isNaN(distanceKm) || distanceKm < 0 ) {
    res.status(400).send('Please provide distance value >= 0');
    return;
  }

  let regionId;

  if ( new_region_name && new_region_name !== '' ) {
    regionId = await addRegion(new_region_name, new_region_country, new_region_description);
  } else {
    regionId = Number(region_id);
  }

  if (!regionId) {
    res.status(400).send('Choose a region or provide a new one');
    return;
  }

  const newTrail = {
    region_id,
    new_region_name,
    new_region_country,
    new_region_description,
    title,
    difficulty,
    distance,
    description,
    image_url
  };
  try {
    await addTrail(regionId, title, difficulty, distanceKm, description, image_url);
    res.status(201).redirect('/admin');
  } catch ( err ) {
    res.status(400).render('admin/form.njk', {
      error: (err as Error).message,
      trail: newTrail,
    });
  }
};

