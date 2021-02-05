import Company from '@modules/companies/infra/mongoose/schemas/Company';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { ObjectID } from 'mongodb';
import Product, { ProductModel } from '../schemas/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  public async findById(
    id: ObjectID | string,
  ): Promise<ProductModel | null | undefined> {
    const product = await Product.findById(id).populate('departments');

    return product;
  }

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

  public async save(product: ProductModel): Promise<ProductModel | null> {
    const saveProduct = await Product.findOneAndUpdate(
      {
        _id: product.id,
      },
      {
        $set: {
          name: product.name,
        },
      },
    );
    return saveProduct;
  }

  public async destroy(
    product: ProductModel,
  ): Promise<ProductModel | null | undefined> {
    const destroyProduct = await Product.findByIdAndRemove(product.id);

    return destroyProduct;
  }
}

export default ProductsRepository;
