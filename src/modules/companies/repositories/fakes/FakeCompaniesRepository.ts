import { ObjectID } from 'mongodb';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import ICompaniesRepository from '../ICompaniesRepository';
import Company from '../../infra/typeorm/schemas/Company';

class FakeCompaniesRepository implements ICompaniesRepository {
  private companies: Company[] = [];

  public async findById(id: ObjectID | string): Promise<Company | undefined> {
    const findCompany = this.companies.find(company => company.id === id);

    return findCompany;
  }

  public async create({
    name,
    cnpj,
    recipient_id,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = new Company();

    Object.assign(company, {
      id: new ObjectID(),
      name,
      cnpj,
      recipient_id,
    });

    this.companies.push(company);

    return company;
  }

  public async save(company: Company): Promise<Company> {
    const findIndex = this.companies.findIndex(
      findCompany => findCompany.id === company.id,
    );

    this.companies[findIndex] = company;

    return company;
  }
}

export default FakeCompaniesRepository;
