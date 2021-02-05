import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';

import { injectable, inject } from 'tsyringe';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import { CompanyModel } from '../infra/mongoose/schemas/Company';

interface IRequest {
  company_id: ObjectID | string;
}

@injectable()
class DestroyCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    company_id,
  }: IRequest): Promise<CompanyModel | null | undefined> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not found.');
    }

    const destroyCompany = await this.companiesRepository.destroy(company);

    return destroyCompany;
  }
}

export default DestroyCompanyService;
