import { Router } from 'express';
import regionsController from '../../controllers/public/regions.controller.ts';

const regions = Router();

regions.get('/regions', regionsController);

export default regions;
