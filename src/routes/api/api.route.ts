import { Router } from 'express';
import {
  getTrailsController,
  getTrailBySlugController, createTrailApiController, patchTrailApiController, deleteTrailApiController,
} from '../../controllers/api/api.trail.controller.ts';
import { getRegionsController, getTrailsByRegionIdController } from '../../controllers/api/api.region.controller.ts';
import { apiKeyHandler } from '../../middleware/api-key.ts';

const apiRoute = Router();

apiRoute.get('/trails', getTrailsController);
apiRoute.post('/trails', apiKeyHandler, createTrailApiController);
apiRoute.get('/trails/:slug', getTrailBySlugController);
apiRoute.patch('/trails/:id', apiKeyHandler, patchTrailApiController);
apiRoute.delete('/trails/:id', apiKeyHandler, deleteTrailApiController);
apiRoute.get('/regions', getRegionsController);
apiRoute.get('/regions/:slug/trails', getTrailsByRegionIdController);

export default apiRoute;
