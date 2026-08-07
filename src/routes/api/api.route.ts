import { Router, type Request, type Response } from 'express';
const apiRoute = Router();

apiRoute.get('/trails', (_req:Request, res:Response) => res.json([]));

// apiRoute.get('/trails/new', getNewTrailForm);
// apiRoute.post('/trails', createTrailController);
// apiRoute.get('/trails/:id/edit', getEditTrailForm);
// apiRoute.post('/trails/:id', updateTrailController);
// apiRoute.post('/trails/:id/delete', deleteTrailController);

export default apiRoute;
