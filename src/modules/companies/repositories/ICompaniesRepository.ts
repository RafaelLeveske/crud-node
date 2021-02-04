import { ObjectID } from 'mongodb';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import { CompanyModel } from '../infra/typeorm/schemas/Company';

export default interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<CompanyModel>;
  findById(id: ObjectID | string): Promise<CompanyModel | null | undefined>;
  save(company: CompanyModel): Promise<CompanyModel>;
}
