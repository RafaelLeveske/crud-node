import { ObjectID } from 'mongodb';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import ICompaniesRepository from '../ICompaniesRepository';
import Company, { CompanyModel } from '../../infra/mongoose/schemas/Company';

class FakeCompaniesRepository implements ICompaniesRepository {
  private companies: CompanyModel[] = [];

  public async findById(
    id: ObjectID | string,
  ): Promise<CompanyModel | null | undefined> {
    const findCompany = this.companies
      .find(company => company.id === id)
      ?.populate('products');

    return findCompany;
  }

  public async create({
    name,
    cnpj,
    user,
  }: ICreateCompanyDTO): Promise<CompanyModel> {
    const company = new Company();

    Object.assign(company, {
      id: new ObjectID(),
      name,
      cnpj,
      user,
    });

    this.companies.push(company);

    return company;
  }

  public async save(company: CompanyModel): Promise<CompanyModel> {
    const findIndex = this.companies.findIndex(
      findCompany => findCompany.id === company.id,
    );

    this.companies[findIndex] = company;

    return company;
  }
}

export default FakeCompaniesRepository;
