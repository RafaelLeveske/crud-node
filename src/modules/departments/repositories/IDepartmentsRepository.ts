import ICreateDepartmentDTO from '../dtos/ICreateDepartmentDTO';
import { DepartmentModel } from '../infra/mongoose/schemas/Department';

interface IFindDepartments {
  id: string;
}

export default interface IDepartmentRepository {
  create(data: ICreateDepartmentDTO): Promise<DepartmentModel>;
  findAllById(departments: IFindDepartments[]): Promise<DepartmentModel[]>;
}
