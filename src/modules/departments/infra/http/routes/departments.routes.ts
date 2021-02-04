import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DepartmentsController from '../controllers/DepartmentsControllers';

const departmentsRouter = Router();
const departmentsController = new DepartmentsController();

departmentsRouter.use(ensureAuthenticated);

departmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(50).required(),
    },
  }),
  departmentsController.create,
);

export default departmentsRouter;
