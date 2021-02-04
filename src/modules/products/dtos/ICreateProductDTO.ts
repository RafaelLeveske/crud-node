import { CompanyModel } from '@modules/companies/infra/mongoose/schemas/Company';

export default interface ICreateProductDTO {
  name: string;
  company: CompanyModel;
}
