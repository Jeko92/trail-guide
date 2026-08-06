import type { Request, Response } from 'express';

const trailsController = async ( _req: Request, res: Response ) => {
  res.render('public/trail.njk', {title: 'Trail Guide - Trail Page '});
}

export default trailsController;
