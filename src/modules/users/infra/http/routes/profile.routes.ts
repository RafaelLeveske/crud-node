import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import grantAccess from '../middlewares/grantAccess';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get(
  '/',
  grantAccess({
    action: 'readOwn' || 'readAny',
    resource: 'profile',
  }),
  profileController.show,
);

profileRouter.put(
  '/',
  grantAccess({
    action: 'updateOwn' || 'updateAny',
    resource: 'profile',
  }),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      role: Joi.string().valid('basic', 'admin'),
    },
  }),
  profileController.update,
);

export default profileRouter;
