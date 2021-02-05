import DestroyProductService from '@modules/products/services/DestroyProductService';
import ShowProductProfileService from '@modules/products/services/ShowProductProfileService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductProfilecontroller {
  public async show(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.query;

    const showProductProfile = container.resolve(ShowProductProfileService);

    const company = await showProductProfile.execute({
      product_id: String(product_id),
    });

    return response.json(company);
  }

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.query;

    const deleteProduct = container.resolve(DestroyProductService);

    await deleteProduct.execute({
      product_id: String(product_id),
    });

    return response.status(200).send();
  }
}
