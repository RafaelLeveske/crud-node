import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';

import { injectable, inject } from 'tsyringe';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import { CompanyModel } from '../infra/mongoose/schemas/Company';

interface IRequest {
  company_id: ObjectID | string;
  name: string;
  cnpj: string;
}

@injectable()
class UpdateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    company_id,
    name,
    cnpj,
  }: IRequest): Promise<CompanyModel | null> {
    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError('Company not found.');
    }

    const companyWithUpdatedCNPJ = await this.companiesRepository.findByCNPJ(
      cnpj,
    );

    if (companyWithUpdatedCNPJ && companyWithUpdatedCNPJ.id !== company_id) {
      throw new AppError('CNPJ already in use.');
    }

    const companyWithUpdatedName = await this.companiesRepository.findByName(
      name,
    );

    if (companyWithUpdatedName && companyWithUpdatedName.id !== company_id) {
      throw new AppError('Company name already in use.');
    }

    company.name = name;
    company.cnpj = cnpj;

    return this.companiesRepository.save(company);
  }
}

export default UpdateCompanyService;
