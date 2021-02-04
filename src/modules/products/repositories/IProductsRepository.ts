import ICreateProductDTO from '../dtos/ICreateProductDTO';
import { ProductModel } from '../infra/mongoose/schemas/Product';

interface IFindProducts {
  id: string;
}

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<ProductModel>;
  findAllById(products: IFindProducts[]): Promise<ProductModel[]>;
}
