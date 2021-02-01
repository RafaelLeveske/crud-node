import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/schemas/Company';

export default interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<Company>;
}
