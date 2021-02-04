import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IDepartmentsRepository from '@modules/departments/repositories/IDepartmentsRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { DepartmentModel } from '../infra/mongoose/schemas/Department';

interface IRequest {
  name: string;
  product_id: string;
}

@injectable()
class CreateDepartmentService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('DepartmentsRepository')
    private departmentsRepository: IDepartmentsRepository,
  ) {}

  public async execute({
    name,
    product_id,
  }: IRequest): Promise<DepartmentModel> {
    const productId = await this.productsRepository.findById(product_id);

    if (!productId) {
      throw new AppError('Product does not exists');
    }

    const department = await this.departmentsRepository.create({
      name,
      product: productId,
    });

    return department;
  }
}

export default CreateDepartmentService;
