import { ObjectID } from 'mongodb';
import Product from '@modules/products/infra/typeorm/schemas/Product';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IProductsRepository from '../IProductsRepository';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    name,
    recipient_id,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: new ObjectID(),
      name,
      recipient_id,
    });

    this.products.push(product);

    return product;
  }
}

export default FakeProductsRepository;
