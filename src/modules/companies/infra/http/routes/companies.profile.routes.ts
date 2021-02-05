import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CompanyProfileController from '../controllers/CompanyProfileController';

const companyProfileRouter = Router();
const companyProfileController = new CompanyProfileController();

companyProfileRouter.get('/', companyProfileController.show);

companyProfileRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(100).required(),
      cnpj: Joi.string().length(14).required(),
    },
  }),
  companyProfileController.update,
);

companyProfileRouter.delete(
  '/',
  ensureAuthenticated,
  companyProfileController.delete,
);

export default companyProfileRouter;
