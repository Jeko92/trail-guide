import { Router } from 'express';
import trailsController from '../../controllers/public/trails.controller.ts';

const trail = Router();

trail.get('/trail', trailsController);

export default trail;
