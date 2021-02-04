import Company from '@modules/companies/infra/mongoose/schemas/Company';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Product, { ProductModel } from '../schemas/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  public async create({
    name,
    company,
  }: ICreateProductDTO): Promise<ProductModel> {
    const product = await Product.create({
      name,
    });

    await Company.findOneAndUpdate(
      { _id: company.id },
      { $push: { products: product.id } },
    );

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<ProductModel[]> {
    const findAllProducts = await Product.find(products);

    return findAllProducts;
  }
}

export default ProductsRepository;
