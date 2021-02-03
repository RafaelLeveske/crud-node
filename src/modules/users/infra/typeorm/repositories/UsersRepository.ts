import { ObjectID } from 'mongodb';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User, { UserModel } from '../schemas/User';

import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private odmRepository: UserModel;

  constructor() {
    this.odmRepository = new User();
  }

  public async findById(id: ObjectID | string): Promise<UserModel | undefined> {
    const user = await this.odmRepository.collection.findOne({ id });

    return user;
  }

  public async findByEmail(email: string): Promise<UserModel | undefined> {
    const user = await this.odmRepository.collection.findOne({ email });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<UserModel> {
    const user = this.odmRepository.collection.findAndModify(userData);

    await this.odmRepository.save(user);

    return user;
  }

  public async save(user: UserModel): Promise<UserModel> {
    return this.odmRepository.collection.findAndModify(user);
  }
}

export default UsersRepository;
