import { ObjectID } from 'mongodb';
import AppError from '@shared/errors/AppError';
import Department, {
  DepartmentModel,
} from '@modules/departments/infra/mongoose/schemas/Department';
import ICreateDepartmentDTO from '@modules/departments/dtos/ICreateDepartmentDTO';
import IDepartmentsRepository from '../IDepartmentsRepository';

interface IFindDepartments {
  id: ObjectID | string;
}

class FakeDepartmentsRepository implements IDepartmentsRepository {
  private departments: DepartmentModel[] = [];

  public async create({
    name,
    product,
  }: ICreateDepartmentDTO): Promise<DepartmentModel> {
    const department = new Department();

    Object.assign(department, {
      id: new ObjectID(),
      name,
      product,
    });

    this.departments.push(department);

    return department;
  }

  public async findAllById(
    departments: IFindDepartments[],
  ): Promise<DepartmentModel[]> {
    const AllIdsFromDepartmentsList = this.departments.map(
      departmentIdFromList => {
        const departmentIds = departments.find(
          departmentId => departmentId.id === departmentIdFromList.id,
        );

        if (!departmentIds) {
          throw new AppError('Department id not found');
        }

        return departmentIdFromList;
      },
    );
    return AllIdsFromDepartmentsList;
  }
}

export default FakeDepartmentsRepository;
