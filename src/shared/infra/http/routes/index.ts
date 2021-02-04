import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import companyProfileRouter from '@modules/companies/infra/http/routes/companyProfile.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/companies', companiesRouter);
routes.use('/products', productsRouter);
routes.use('/company-profile', companyProfileRouter);

export default routes;
