import { ObjectID } from 'mongodb';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User, { UserModel } from '../../infra/typeorm/schemas/User';

class FakeUsersRepository implements IUsersRepository {
  private users: UserModel[] = [];

  public async findById(id: ObjectID | string): Promise<UserModel | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<UserModel | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<UserModel> {
    const user = new User();

    Object.assign(user, { id: new ObjectID() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: UserModel): Promise<UserModel> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
