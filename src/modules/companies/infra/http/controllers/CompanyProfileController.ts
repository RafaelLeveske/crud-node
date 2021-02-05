import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowCompanyProfileService from '@modules/companies/services/ShowCompanyProfileService';
import UpdateCompanyService from '@modules/companies/services/UpdateCompanyService';
import DestroyCompanyService from '@modules/companies/services/DestroyCompanyService';

export default class CompanyProfilecontroller {
  public async show(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.query;

    const showCompanyProfile = container.resolve(ShowCompanyProfileService);

    const company = await showCompanyProfile.execute({
      company_id: String(company_id),
    });

    return response.json(company);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.query;
    const { name, cnpj } = request.body;

    const updateCompany = container.resolve(UpdateCompanyService);

    const company = await updateCompany.execute({
      name,
      cnpj,
      company_id: String(company_id),
    });

    return response.json(company);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.query;

    const deleteCompany = container.resolve(DestroyCompanyService);

    await deleteCompany.execute({
      company_id: String(company_id),
    });

    return response.status(200).send();
  }
}
