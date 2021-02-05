import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import departmentsRouter from '@modules/departments/infra/http/routes/departments.routes';
import companyProfileRouter from '@modules/companies/infra/http/routes/companies.profile.routes';
import productProfileRouter from '@modules/products/infra/http/routes/products.profile';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/companies', companiesRouter);
routes.use('/company-profile', companyProfileRouter);
routes.use('/products', productsRouter);
routes.use('/product-profile', productProfileRouter);
routes.use('/departments', departmentsRouter);

export default routes;
