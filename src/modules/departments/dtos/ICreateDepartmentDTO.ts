import { ProductModel } from '@modules/products/infra/mongoose/schemas/Product';

export default interface ICreateDepartmentDTO {
  name: string;
  product: ProductModel;
}
