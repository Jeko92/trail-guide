import { Router } from 'express';
import adminRoute from './admin.route.ts';

const adminRoutes = Router();

adminRoutes.use('/admin', adminRoute);

export default adminRoutes;
