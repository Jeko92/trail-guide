import { Router } from 'express';
import {
  adminController,
  createTrail,
  getEditTrailForm,
  getNewTrailForm,
  updateTrailController
} from '../../controllers/admin/admin.controller.ts';

const adminRoute = Router();

adminRoute.get('/', adminController);

adminRoute.get('/trails/new', getNewTrailForm);
adminRoute.post('/trails', createTrail);
adminRoute.get('/trails/:id/edit', getEditTrailForm);
adminRoute.post('/trails/:id', updateTrailController);

export default adminRoute;
