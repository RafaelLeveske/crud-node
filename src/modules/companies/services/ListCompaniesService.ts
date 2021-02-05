import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import { CompanyModel } from '../infra/mongoose/schemas/Company';

interface IRequest {
  id: string;
}

@injectable()
class ListCompaniesService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute(companies: IRequest[]): Promise<CompanyModel[]> {
    const allCompaniesIds = await this.companiesRepository.findAllById(
      companies,
    );

    return allCompaniesIds;
  }
}

export default ListCompaniesService;
