import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/mongoose/repositories/UsersRepository';
import CompaniesRepository from '@modules/companies/infra/mongoose/repositories/CompaniesRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IDepartmentsRepository from '@modules/departments/repositories/IDepartmentsRepository';
import ICompaniesRepository from '../../modules/companies/repositories/ICompaniesRepository';
import ProductsRepository from '../../modules/products/infra/mongoose/repositories/ProductsRepository';
import DepartmentsRepository from '../../modules/departments/infra/mongoose/repositories/DepartmentsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IDepartmentsRepository>(
  'DepartmentsRepository',
  DepartmentsRepository,
);
