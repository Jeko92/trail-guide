import type { Request, Response } from 'express';
import {
  addTrail,
  deleteTrail,
  getAllTrails,
  getTrailById,
  getTrailsByRegionId,
  updateTrail
} from '../../models/trails.model.ts';
import { formatDate, sanitizePostContent } from '../../utils/utils.ts';
import { addRegion, deleteRegion, getAllRegions } from '../../models/regions.model.ts';
import type { Difficulty } from '../../types/types.ts';

// Shared by createTrail/updateTrailController (admin) and the API trail
// controller: resolves req.body down to a single region id, either the one
// picked from the <select> (or an equivalent region_id in a JSON body), or a
// brand-new region created on the fly if new_region_name (etc.) were filled
// in. Returns null if neither path produced a usable id.
export async function resolveRegionId ( body: Request['body'] ): Promise<number | null> {
  const { region_id, new_region_name, new_region_country, new_region_description } = body;

  if ( new_region_name && new_region_name !== '' ) {
    return addRegion(new_region_name, new_region_country, new_region_description);
  }

  const regionId = Number(region_id);
  return regionId || null;
}

interface ValidatedTrailFields {
  title: string;
  difficulty: Difficulty;
  distanceKm: number;
  description: string;
  image_url: string;
}

// Shared by createTrail and updateTrailController
function validateTrailFields ( body: Request['body'] ): { data: ValidatedTrailFields } | { error: string } {
  const { title, difficulty, distance, description, image_url } = body;

  if ( !title ) {
    return { error: 'Title is required' };
  }

  const validDifficulties: Difficulty[] = [ 'easy', 'moderate', 'hard' ];
  if ( !validDifficulties.includes(difficulty) ) {
    return { error: 'Choose trail difficulty' };
  }

  const distanceKm = Number(distance);
  if ( !distance || Number.isNaN(distanceKm) || distanceKm < 0 ) {
    return { error: 'Please provide distance value >= 0' };
  }

  return { data: { title, difficulty, distanceKm, description, image_url } };
}

// Shared by createTrail/updateTrailController (admin) and the API trail
// controller
export async function prepareTrailData (
  body: Request['body'],
): Promise<{ data: ValidatedTrailFields & { regionId: number } } | { error: string }> {
  const validated = validateTrailFields(body);
  if ( 'error' in validated ) {
    return validated;
  }

  const regionId = await resolveRegionId(body);
  if ( !regionId ) {
    return { error: 'Choose a region or provide a new one' };
  }

  return { data: { ...validated.data, regionId } };
}

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

export const getEditTrailForm = async ( req: Request<{ id: string }>, res: Response ) => {
  const trail = await getTrailById(req.params.id);

  if ( !trail ) {
    res.status(404).render('public/404.njk', { title: 'Trail not found' });
    return;
  }

  const regions = await getAllRegions();
  res.render('admin/form.njk', { title: 'Trail Guide - Edit trail', trail, regions });
};

export const createTrailController = async ( req: Request, res: Response ) => {
  const prepared = await prepareTrailData(req.body);
  if ( 'error' in prepared ) {
    res.status(400).send(prepared.error);
    return;
  }
  const { title, difficulty, distanceKm, description, image_url, regionId } = prepared.data;

  try {
    await addTrail(regionId, title, difficulty, distanceKm, description, image_url);
    res.status(201).redirect('/admin');
  } catch ( err ) {
    res.status(400).render('admin/form.njk', {
      error: (err as Error).message,
      trail: req.body,
    });
  }
};

export async function updateTrailController ( req: Request<{ id: string }>, res: Response ): Promise<void> {
  const id = req.params.id;

  if ( !Number.isInteger(Number(id)) ) {
    res.status(400).send('Invalid id');
    return;
  }

  const existingTrail = await getTrailById(id);
  if ( !existingTrail ) {
    res.status(404).render('public/404.njk', { title: 'Trail not found' });
    return;
  }

  const prepared = await prepareTrailData(req.body);
  if ( 'error' in prepared ) {
    res.status(400).send(prepared.error);
    return;
  }
  const { title, difficulty, distanceKm, description, image_url, regionId } = prepared.data;

  try {
    await updateTrail(id, {
      region_id: regionId,
      title,
      difficulty,
      distance_km: distanceKm,
      description: sanitizePostContent(description),
      image_url,
    });
    res.redirect('/admin');
  } catch ( err ) {
    res.status(400).render('admin/form.njk', {
      error: (err as Error).message,
      trail: { ...req.body, id: existingTrail.id },
    });
  }
}

export async function deleteTrailController ( req: Request<{ id: string }>, res: Response ): Promise<void> {
  const id = req.params.id;

  if ( !Number.isInteger(Number(id)) ) {
    res.status(400).send('Invalid id');
    return;
  }

  const trail = await getTrailById(id);
  if ( !trail ) {
    res.status(404).render('public/404.njk', { title: 'Trail not found' });
    return;
  }

  try {
    await deleteTrail(id);

    // If that was the last trail in this region, the region must also be deleted.
    const remainingTrailsInRegion = await getTrailsByRegionId(trail.region_id);
    if ( remainingTrailsInRegion.length === 0 ) {
      await deleteRegion(trail.region_id);
    }
  } catch ( err ) {
    console.error(`Failed to delete trail with id "${id}":`, err);
  }

  res.redirect('/admin');
}
