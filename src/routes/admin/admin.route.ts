import { Router } from 'express';
import { adminController, createTrail, getEditTrailForm, getNewTrailForm } from '../../controllers/admin/admin.controller.ts';

const adminRoute = Router();

adminRoute.get('/', adminController);

adminRoute.get('/trails/new', getNewTrailForm);
adminRoute.post('/trails', createTrail);
adminRoute.get('/trails/:id/edit', getEditTrailForm);

export default adminRoute;
