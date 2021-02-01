import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICompaniesRepository from '../repositories/ICompaniesRepository';
import Company from '../infra/typeorm/schemas/Company';

interface IRequest {
  name: string;
  user_id: ObjectID;
}

@injectable()
class CreateCompanyService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ name, user_id }: IRequest): Promise<Company> {
    const userId = await this.usersRepository.findById(user_id);

    if (!userId) {
      throw new AppError('User does not exists');
    }

    const company = await this.companiesRepository.create({
      name,
      recipient_id: user_id,
    });

    // await this.cacheProvider.invalidatePrefix('providers-list');Email address already used

    return company;
  }
}

export default CreateCompanyService;
