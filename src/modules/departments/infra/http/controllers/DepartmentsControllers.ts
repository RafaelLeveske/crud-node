import CreateDepartmentService from '@modules/departments/services/CreateDepartmentService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DepartmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { product_id } = request.query;

    const createDepartment = container.resolve(CreateDepartmentService);

    const department = await createDepartment.execute({
      name,
      product_id: String(product_id),
    });

    return response.json(department);
  }
}
