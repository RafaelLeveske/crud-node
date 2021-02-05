import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProductProfileController from '../controllers/ProductProfileController';

const productProfileRouter = Router();
const companyProfileController = new ProductProfileController();

productProfileRouter.use(ensureAuthenticated);

// productProfileRouter.get('/', companyProfileController.show);

productProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(50).required(),
    },
  }),
  companyProfileController.update,
);

// productProfileRouter.delete('/', companyProfileController.delete);

export default productProfileRouter;
