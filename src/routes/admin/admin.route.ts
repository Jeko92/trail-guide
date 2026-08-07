import { Router, type Request, type Response } from 'express';

const adminRoutes = Router();

adminRoutes.get('/admin', (_req:Request, res:Response) => res.send('Admin OK'));

export default adminRoutes;
