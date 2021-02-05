import UpdateProductService from '@modules/products/services/UpdateProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductProfilecontroller {
  // public async show(request: Request, response: Response): Promise<Response> {
  //   const { company_id } = request.query;

  //   const showCompanyProfile = container.resolve(ShowCompanyProfileService);

  //   const company = await showCompanyProfile.execute({
  //     company_id: String(company_id),
  //   });

  //   return response.json(company);
  // }

  public async update(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.query;
    const { name } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      name,
      product_id: String(product_id),
    });

    return response.json(product);
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { company_id } = request.query;

  //   const deleteCompany = container.resolve(DestroyCompanyService);

  //   await deleteCompany.execute({
  //     company_id: String(company_id),
  //   });

  //   return response.status(200).send();
  // }
}
