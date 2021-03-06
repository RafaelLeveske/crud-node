import { ObjectID } from 'mongodb';
import Product, {
  ProductModel,
} from '@modules/products/infra/mongoose/schemas/Product';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../IProductsRepository';

interface IFindProducts {
  id: ObjectID | string;
}

class FakeProductsRepository implements IProductsRepository {
  private products: ProductModel[] = [];

  public async findById(
    id: ObjectID | string,
  ): Promise<ProductModel | null | undefined> {
    const findProduct = this.products
      .find(product => product.id === id)
      ?.populate('departments');

    return findProduct;
  }

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

  public async save(product: ProductModel): Promise<ProductModel | null> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );

    this.products[findIndex] = product;

    return product;
  }

  public async destroy(
    product: ProductModel,
  ): Promise<ProductModel | null | undefined> {
    const findProductToDestroy = this.products.find(findProduct => {
      const deleteProduct = findProduct.id === product.id;

      return deleteProduct;
    });

    return findProductToDestroy;
  }
}

export default FakeProductsRepository;
