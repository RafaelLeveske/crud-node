import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import { CompanyModel } from '../infra/mongoose/schemas/Company';

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

    const checkCompanyCNPJExists = await this.companiesRepository.findByCNPJ(
      cnpj,
    );
    if (checkCompanyCNPJExists) {
      throw new AppError('Company CNPJ already used');
    }

    const checkCompanyNameExists = await this.companiesRepository.findByName(
      name,
    );
    if (checkCompanyNameExists) {
      throw new AppError('Company name already used');
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
