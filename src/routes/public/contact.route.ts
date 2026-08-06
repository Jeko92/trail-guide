import { Router } from 'express';
import contactController from '../../controllers/public/contact.controller.ts';

const contact = Router();

contact.get('/contact', contactController);

export default contact;
