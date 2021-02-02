import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/schemas/Product';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
}
