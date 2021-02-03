import { UserModel } from '@modules/users/infra/typeorm/schemas/User';

export default interface ICreateCompanyDTO {
  name: string;
  cnpj: string;
  user: UserModel;
}
