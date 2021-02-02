import { ObjectID } from 'mongodb';
import Product from '@modules/products/infra/typeorm/schemas/Product';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../IProductsRepository';

interface IFindProducts {
  id: ObjectID | string;
}

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

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const AllIdsFromProductsList = this.products.map(productIdFromList => {
      const productIds = products.find(
        productId => productId.id === productIdFromList.id,
      );

      if (!productIds) {
        throw new AppError('Product id not found');
      }

      return productIdFromList;
    });
    return AllIdsFromProductsList;
  }
}

export default FakeProductsRepository;
