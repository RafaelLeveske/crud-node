import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import { injectable, inject } from 'tsyringe';
import { ProductModel } from '@modules/products/infra/mongoose/schemas/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  product_id: ObjectID | string;
  name: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    product_id,
    name,
  }: IRequest): Promise<ProductModel | null> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    product.name = name;

    return this.productsRepository.save(product);
  }
}

export default UpdateProductService;
