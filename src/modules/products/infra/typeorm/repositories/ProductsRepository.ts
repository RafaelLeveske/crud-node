import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Product, { ProductModel } from '../schemas/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  public async create(productData: ICreateProductDTO): Promise<ProductModel> {
    const product = await Product.create(productData);

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<ProductModel[]> {
    const findAllProducts = await Product.find(products);

    return findAllProducts;
  }
}

export default ProductsRepository;
