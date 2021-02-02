import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Product from '../infra/typeorm/schemas/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  company_id: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, company_id }: IRequest): Promise<Product> {
    const companyId = await this.companiesRepository.findById(company_id);

    if (!companyId) {
      throw new AppError('User does not exists');
    }

    const product = await this.productsRepository.create({
      name,
      recipient_id: company_id,
    });

    return product;
  }
}

export default CreateProductService;
