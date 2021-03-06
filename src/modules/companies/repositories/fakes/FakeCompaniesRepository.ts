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

  public async findByCNPJ(
    cnpj: string,
  ): Promise<CompanyModel | null | undefined> {
    const findCompany = this.companies.find(company => company.cnpj === cnpj);

    return findCompany;
  }

  public async findByName(
    name: string,
  ): Promise<CompanyModel | null | undefined> {
    const findCompany = this.companies.find(company => company.name === name);

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

  public async save(company: CompanyModel): Promise<CompanyModel | null> {
    const findIndex = this.companies.findIndex(
      findCompany => findCompany.id === company.id,
    );

    this.companies[findIndex] = company;

    return company;
  }

  public async destroy(
    company: CompanyModel,
  ): Promise<CompanyModel | null | undefined> {
    const findCompanyToDestroy = this.companies.find(findCompany => {
      const deleteCompany = findCompany.id === company.id;

      return deleteCompany;
    });

    return findCompanyToDestroy;
  }
}

export default FakeCompaniesRepository;
