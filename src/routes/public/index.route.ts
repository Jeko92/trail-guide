import { Router } from 'express';
import home from './home.route.ts';
import about from './about.route.ts';
import contact from './contact.route.ts';
import regions from './regions.route.ts';
import trail from './trail.route.ts';

const publicRoutes = Router();

publicRoutes.use(home).use(about).use(regions).use(trail).use(contact);

export default publicRoutes;
