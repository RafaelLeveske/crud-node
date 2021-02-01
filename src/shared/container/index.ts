import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CompaniesRepository from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';
import ICompaniesRepository from '../../modules/companies/repositories/ICompaniesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);
