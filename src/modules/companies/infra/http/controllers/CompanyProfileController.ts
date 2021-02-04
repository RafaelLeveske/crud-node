import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowCompanyProfileService from '@modules/companies/services/ShowCompanyProfileService';

export default class CompanyProfilecontroller {
  public async show(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.query;

    const showCompanyProfile = container.resolve(ShowCompanyProfileService);

    const company = await showCompanyProfile.execute({
      company_id: String(company_id),
    });

    return response.json(company);
  }
}
