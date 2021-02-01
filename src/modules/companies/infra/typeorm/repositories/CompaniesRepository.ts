import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import Company from '../schemas/Company';

class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: MongoRepository<Company>;

  constructor() {
    this.ormRepository = getMongoRepository(Company, 'mongo');
  }

  public async create({
    name,
    recipient_id,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create({
      name,
      recipient_id,
    });

    await this.ormRepository.save(company);

    return company;
  }
}

export default CompaniesRepository;
