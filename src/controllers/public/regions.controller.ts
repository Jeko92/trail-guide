import type { Request, Response } from 'express';

const regionsController = async ( _req: Request, res: Response ) => {
  res.render('public/regions.njk', { title: "Trail Guide - Regions" });
}

export default regionsController;
