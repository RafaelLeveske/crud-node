import { ObjectID } from 'mongodb';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import ICompaniesRepository from '../ICompaniesRepository';
import Company from '../../infra/typeorm/schemas/Company';

class FakeCompaniesRepository implements ICompaniesRepository {
  private notifications: Company[] = [];

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

    this.notifications.push(company);

    return company;
  }
}

export default FakeCompaniesRepository;
