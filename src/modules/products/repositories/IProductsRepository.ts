import { ObjectID } from 'mongodb';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import { ProductModel } from '../infra/mongoose/schemas/Product';

interface IFindProducts {
  id: string;
}

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<ProductModel>;
  findById(id: ObjectID | string): Promise<ProductModel | null | undefined>;
  findAllById(products: IFindProducts[]): Promise<ProductModel[]>;
  save(product: ProductModel): Promise<ProductModel | null>;
}
