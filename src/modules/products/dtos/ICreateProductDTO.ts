import { CompanyModel } from '@modules/companies/infra/typeorm/schemas/Company';

export default interface ICreateNotificationDTO {
  name: string;
  company: CompanyModel;
}
