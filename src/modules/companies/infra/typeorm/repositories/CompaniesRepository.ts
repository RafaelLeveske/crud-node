import mongoose from 'mongoose';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import Company, { CompanyModel } from '../schemas/Company';

class CompaniesRepository implements ICompaniesRepository {
  public async findById(id: string): Promise<CompanyModel | null | undefined> {
    const company = await Company.findById({ id });

    return company;
  }

  public async create(companyData: ICreateCompanyDTO): Promise<CompanyModel> {
    const company = await Company.create(companyData);

    return company;
  }

  public async save(company: CompanyModel): Promise<CompanyModel> {
    const saveCompany = await Company.updateOne(
      {
        _id: new mongoose.mongo.ObjectId(company.id),
      },
      {
        $set: {
          name: company.name,
          cnpj: company.cnpj,
        },
      },
    );
    return saveCompany;
  }
}

export default CompaniesRepository;
