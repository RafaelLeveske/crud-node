import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import User from '@modules/users/infra/mongoose/schemas/User';
import { ObjectID } from 'mongodb';
import Company, { CompanyModel } from '../schemas/Company';

class CompaniesRepository implements ICompaniesRepository {
  public async findById(
    id: ObjectID | string,
  ): Promise<CompanyModel | null | undefined> {
    const company = await Company.findById(id).populate('products');

    return company;
  }

  public async findByCNPJ(
    cnpj: string,
  ): Promise<CompanyModel | null | undefined> {
    const company = await Company.findOne({ cnpj });

    return company;
  }

  public async findByName(
    name: string,
  ): Promise<CompanyModel | null | undefined> {
    const company = await Company.findOne({ name });

    return company;
  }

  public async create({
    name,
    cnpj,
    user,
  }: ICreateCompanyDTO): Promise<CompanyModel> {
    const company = await Company.create({
      name,
      cnpj,
    });

    await User.findOneAndUpdate(
      { _id: user.id },
      { $push: { companies: company.id } },
    );

    return company;
  }

  public async save(company: CompanyModel): Promise<CompanyModel | null> {
    const saveCompany = await Company.findOneAndUpdate(
      {
        _id: company.id,
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

  public async destroy(
    company: CompanyModel,
  ): Promise<CompanyModel | null | undefined> {
    const destroyCompany = await Company.findByIdAndRemove(company.id);

    return destroyCompany;
  }
}

export default CompaniesRepository;
