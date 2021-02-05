import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'mongodb';
import IUsersRepository from '../repositories/IUsersRepository';
import { UserModel } from '../infra/mongoose/schemas/User';

interface IRequest {
  user_id: ObjectID | string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<UserModel> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
