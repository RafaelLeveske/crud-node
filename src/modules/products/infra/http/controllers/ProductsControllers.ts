import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../../../services/CreateProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, company_id } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      company_id,
    });

    console.log(product);

    return response.json(product);
  }
}
