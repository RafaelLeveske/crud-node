import { CompanyModel } from '@modules/companies/infra/typeorm/schemas/Company';

export default interface ICreateProductDTO {
  name: string;
  company: CompanyModel;
}
