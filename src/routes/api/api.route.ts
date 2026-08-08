import { Router } from 'express';
import {
  getTrailsController,
  getTrailBySlugController,
} from '../../controllers/api/api.trail.controller.ts';
import { getRegionsController, getTrailsByRegionIdController } from '../../controllers/api/api.region.controller.ts';

const apiRoute = Router();

apiRoute.get('/trails', getTrailsController);
apiRoute.get('/trails/:slug', getTrailBySlugController);
apiRoute.get('/regions', getRegionsController);
apiRoute.get('/regions/:slug/trails', getTrailsByRegionIdController);

export default apiRoute;
