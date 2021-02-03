import { ObjectID } from 'mongodb';
import Product, {
  ProductModel,
} from '@modules/products/infra/typeorm/schemas/Product';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../IProductsRepository';

interface IFindProducts {
  id: ObjectID | string;
}

class FakeProductsRepository implements IProductsRepository {
  private products: ProductModel[] = [];

  public async create({
    name,
    company,
  }: ICreateProductDTO): Promise<ProductModel> {
    const product = new Product();

    Object.assign(product, {
      id: new ObjectID(),
      name,
      company,
    });

    this.products.push(product);

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<ProductModel[]> {
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
