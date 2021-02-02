import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import Product from '../schemas/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: MongoRepository<Product>;

  constructor() {
    this.ormRepository = getMongoRepository(Product, 'mongo');
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;