import { UserModel } from '@modules/users/infra/mongoose/schemas/User';

export default interface ICreateCompanyDTO {
  name: string;
  cnpj: string;
  user: UserModel;
}
