import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import { injectable, inject } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';
import { ProductModel } from '../infra/mongoose/schemas/Product';

interface IRequest {
  product_id: ObjectID | string;
}

@injectable()
class DestroyProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    product_id,
  }: IRequest): Promise<ProductModel | null | undefined> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const destroyProduct = await this.productsRepository.destroy(product);

    return destroyProduct;
  }
}

export default DestroyProductService;
