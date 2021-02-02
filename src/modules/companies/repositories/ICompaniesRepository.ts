import { ObjectID } from 'mongodb';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/schemas/Company';

export default interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<Company>;
  findById(id: ObjectID | string): Promise<Company | undefined>;
  save(company: Company): Promise<Company>;
}
