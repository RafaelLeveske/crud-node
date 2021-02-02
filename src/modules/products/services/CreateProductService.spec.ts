import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import CreateCompanyService from '@modules/companies/services/CreateCompanyService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeHashProvider: FakeHashProvider;
let fakeProductsRepository: FakeProductsRepository;
let createUser: CreateUserService;
let createCompany: CreateCompanyService;
let createProduct: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeProductsRepository = new FakeProductsRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    createCompany = new CreateCompanyService(
      fakeUsersRepository,
      fakeCompaniesRepository,
    );

    createProduct = new CreateProductService(
      fakeCompaniesRepository,
      fakeProductsRepository,
    );
  });

  it('should be able to create a new product', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const company = await createCompany.execute({
      name: 'Doe Company',
      cnpj: '00099900099900',
      user_id: Object(user.id),
    });

    const product = await createProduct.execute({
      name: 'Doe Product',
      company_id: Object(company.id),
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a new product from a non existing company', async () => {
    await expect(
      createProduct.execute({
        name: 'Doe Product',
        company_id: Object(1222),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
