import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/schemas/Product';

interface IFindProducts {
  id: string;
}

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findAllById(products: IFindProducts[]): Promise<Product[]>;
}
