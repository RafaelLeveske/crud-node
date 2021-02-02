import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../../../services/CreateProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, company_id } = request.body;

    const createCompany = container.resolve(CreateProductService);

    const product = await createCompany.execute({
      name,
      company_id,
    });

    return response.json(product);
  }
}
