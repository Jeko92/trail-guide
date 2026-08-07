import type { Request, Response } from 'express';
import { addTrail, getAllTrails } from '../../models/trails.model.ts';
import { formatDate, sanitizePostContent } from '../../utils/utils.ts';

export const adminController = async (_req: Request, res: Response) => {
  const trails = await getAllTrails();
  const sanitizedTrails = trails.map((trail)=>({
      ...trail,
      description: sanitizePostContent(trail.description),
      createdAt: formatDate(trail.created_at)
    })
  );

  res.render('admin/list.njk', {
    title: 'Trail Guide - Admin Dashboard',
    trails:sanitizedTrails
  });
};

export const getNewTrailForm = async (_req:Request,res:Response)=>{
  res.render('admin/form.njk', {title: 'Trail Guide - Create new trail'})
}

export const createTrail = async (req:Request,res:Response)=> {
  const {title} = req.body || '';

  if(!title){
    res.status(400).send("Title is required");
    return;
  }

  const newTrail = {
    title
  }

  try {
    await addTrail(newTrail.title);
    res.status(201).redirect('/admin');
  }catch ( err ) {
    res.status(400).render('admin/form.njk', {
      error: (err as Error).message,
      trail: newTrail,
    });
  }
}

