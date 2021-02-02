import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateCompanyService from '@modules/companies/services/CreateCompanyService';

export default class CompaniesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cnpj } = request.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute({
      name,
      cnpj,
      user_id: request.user.id,
    });

    return response.json(classToClass(company));
  }
}
