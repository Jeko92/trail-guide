import { Router } from 'express';
import { adminController, createTrail, getNewTrailForm } from '../../controllers/admin/admin.controller.ts';

const adminRoute = Router();

adminRoute.get('/', adminController);

adminRoute.get('/trails/new', getNewTrailForm);
adminRoute.post('/trails', createTrail);

export default adminRoute;
