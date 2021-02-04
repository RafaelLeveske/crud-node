import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import { CompanyModel } from '../infra/typeorm/schemas/Company';

interface IRequest {
  name: string;
  cnpj: string;
  user_id: string;
}

@injectable()
class CreateCompanyService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    name,
    cnpj,
    user_id,
  }: IRequest): Promise<CompanyModel> {
    const userId = await this.usersRepository.findById(user_id);

    if (!userId) {
      throw new AppError('User does not exists');
    }

    const company = await this.companiesRepository.create({
      name,
      cnpj,
      user: userId,
    });

    return company;
  }
}

export default CreateCompanyService;
