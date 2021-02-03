import 'reflect-metadata';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ProductModel } from '../infra/typeorm/schemas/Product';
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

  public async execute({ name, company_id }: IRequest): Promise<ProductModel> {
    const companyId = await this.companiesRepository.findById(company_id);

    if (!companyId) {
      throw new AppError('Company does not exists');
    }

    const product = await this.productsRepository.create({
      name,
      company: companyId,
    });

    return product;
  }
}

export default CreateProductService;
