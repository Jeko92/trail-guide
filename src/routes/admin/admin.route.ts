import { Router } from 'express';
import adminController from '../../controllers/admin/admin.controller.ts';

const adminRoute = Router();

adminRoute.get('/', adminController);

adminRoute.get('/trails/new', (_req,res)=>{
  res.render('admin/form.njk', {title: 'Trail Guide - Create new trail'})
});

export default adminRoute;
