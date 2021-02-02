import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateCompanyService from '@modules/companies/services/CreateCompanyService';

export default class CompaniesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCompany = container.resolve(CreateCompanyService);

    const user = await createCompany.execute({
      name,
      user_id: request.user.id,
    });

    return response.json(classToClass(user));
  }
}
