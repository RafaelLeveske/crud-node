import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import { CompanyModel } from '@modules/companies/infra/typeorm/schemas/Company';
import { ObjectID } from 'mongodb';

interface IRequest {
  company_id: ObjectID | string;
}

@injectable()
class ShowCompanyProfileService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ company_id }: IRequest): Promise<CompanyModel> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not found');
    }

    return company;
  }
}

export default ShowCompanyProfileService;
