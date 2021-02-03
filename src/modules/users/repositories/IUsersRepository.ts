import { ObjectID } from 'mongodb';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import { UserModel } from '../infra/typeorm/schemas/User';

export default interface IUsersRepository {
  findById(id: ObjectID | string): Promise<UserModel | undefined>;
  findByEmail(email: string): Promise<UserModel | undefined>;
  create(data: ICreateUserDTO): Promise<UserModel>;
}
