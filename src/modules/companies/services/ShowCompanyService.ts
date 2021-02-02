import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'mongodb';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import Company from '@modules/companies/infra/typeorm/schemas/Company';

interface IRequest {
  company_id: ObjectID | string;
}

@injectable()
class ShowCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ company_id }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not found');
    }

    return company;
  }
}

export default ShowCompanyService;
