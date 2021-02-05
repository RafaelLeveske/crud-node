import { ObjectID } from 'mongodb';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import { CompanyModel } from '../infra/mongoose/schemas/Company';

interface IFindCompanies {
  id: string;
}

export default interface ICompaniesRepository {
  findById(id: ObjectID | string): Promise<CompanyModel | null | undefined>;
  findByCNPJ(cnpj: string): Promise<CompanyModel | null | undefined>;
  findByName(name: string): Promise<CompanyModel | null | undefined>;
  create(data: ICreateCompanyDTO): Promise<CompanyModel>;
  findAllById(companies: IFindCompanies[]): Promise<CompanyModel[]>;
  save(company: CompanyModel): Promise<CompanyModel | null>;
  destroy(company: CompanyModel): Promise<CompanyModel | null | undefined>;
}
