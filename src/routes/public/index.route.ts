import { Router } from 'express';
import home from './home.route.ts';

const publicRoutes = Router();

publicRoutes
  .use(home)

export default publicRoutes;
