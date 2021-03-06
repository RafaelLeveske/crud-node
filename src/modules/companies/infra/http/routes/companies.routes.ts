import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CompaniesController from '../controllers/CompaniesControllers';

const companiesRouter = Router();
const companiesController = new CompaniesController();

companiesRouter.use(ensureAuthenticated);

companiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(100).required(),
      cnpj: Joi.string().length(14).required(),
    },
  }),
  companiesController.create,
);

export default companiesRouter;
