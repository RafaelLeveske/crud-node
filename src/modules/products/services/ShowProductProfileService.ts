import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ObjectID } from 'mongodb';
import IProductsRepository from '../repositories/IProductsRepository';
import { ProductModel } from '../infra/mongoose/schemas/Product';

interface IRequest {
  product_id: ObjectID | string;
}

@injectable()
class ShowProductProfileService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ product_id }: IRequest): Promise<ProductModel> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductProfileService;
