import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeUsersRepository: FakeUsersRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let createProduct: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeCompaniesRepository = new FakeCompaniesRepository();

    createProduct = new CreateProductService(
      fakeCompaniesRepository,
      fakeProductsRepository,
    );
  });

  it('should be able to create a new product', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'basic',
    });

    const company = await fakeCompaniesRepository.create({
      name: 'Doe Company',
      cnpj: '00099900099900',
      user: user.id,
    });

    const product = await createProduct.execute({
      name: 'Doe Product',
      company_id: company.id,
    });

    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('departments');
  });

  it('should not be able to create a new product from a non existing company', async () => {
    await expect(
      createProduct.execute({
        name: 'Doe Product',
        company_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
