import IDepartmentsRepository from '@modules/departments/repositories/IDepartmentsRepository';
import Product from '@modules/products/infra/mongoose/schemas/Product';
import ICreateDepartmentDTO from '../../../dtos/ICreateDepartmentDTO';
import Department, { DepartmentModel } from '../schemas/Department';

interface IFindDepartments {
  id: string;
}

class DepartmentsRepository implements IDepartmentsRepository {
  public async create({
    name,
    product,
  }: ICreateDepartmentDTO): Promise<DepartmentModel> {
    const department = await Department.create({
      name,
    });

    await Product.findOneAndUpdate(
      { _id: product.id },
      { $push: { departments: department.id } },
    );

    return department;
  }

  public async findAllById(
    departments: IFindDepartments[],
  ): Promise<DepartmentModel[]> {
    const findAllDepartments = await Department.find(departments);

    return findAllDepartments;
  }
}

export default DepartmentsRepository;
