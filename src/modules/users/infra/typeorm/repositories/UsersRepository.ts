import { getMongoRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../schemas/User';

import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: MongoRepository<User>;

  constructor() {
    this.ormRepository = getMongoRepository(User);
  }

  public async findById(id: ObjectID): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(String(id));

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
