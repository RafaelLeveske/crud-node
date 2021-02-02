import { Router } from 'express';
import CompanyProfileController from '../controllers/CompanyProfileController';

const companyProfileRouter = Router();
const companyProfileController = new CompanyProfileController();

companyProfileRouter.get('/', companyProfileController.show);

export default companyProfileRouter;
