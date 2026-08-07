import type { Request, Response } from 'express';
import { getAllTrails } from '../../models/trails.model.ts';
import { formatDate, sanitizePostContent } from '../../utils/utils.ts';

const adminController = async (_req: Request, res: Response) => {
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

export default adminController;
