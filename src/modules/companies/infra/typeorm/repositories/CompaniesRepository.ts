import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';
import Company from '../schemas/Company';

class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: MongoRepository<Company>;

  constructor() {
    this.ormRepository = getMongoRepository(Company, 'mongo');
  }

  public async findById(id: ObjectID | string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne(String(id));

    return company;
  }

  public async create(companyData: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create(companyData);

    await this.ormRepository.save(company);

    return company;
  }

  public async save(company: Company): Promise<Company> {
    return this.ormRepository.save(company);
  }
}

export default CompaniesRepository;
