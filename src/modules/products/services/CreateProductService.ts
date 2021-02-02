import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Product from '../infra/typeorm/schemas/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  user_id: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, user_id }: IRequest): Promise<Product> {
    const userId = await this.usersRepository.findById(user_id);

    if (!userId) {
      throw new AppError('User does not exists');
    }

    const product = await this.productsRepository.create({
      name,
      recipient_id: user_id,
    });

    return product;
  }
}

export default CreateProductService;
