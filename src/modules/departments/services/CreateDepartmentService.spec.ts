import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeDepartmentsRepository from '../repositories/fakes/FakeDepartmentsRepository';
import CreateDepartmentService from './CreateDepartmentService';

let fakeProductsRepository: FakeProductsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeDepartmentsRepository: FakeDepartmentsRepository;
let createDepartment: CreateDepartmentService;

describe('CreateDepartment', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeDepartmentsRepository = new FakeDepartmentsRepository();

    createDepartment = new CreateDepartmentService(
      fakeProductsRepository,
      fakeDepartmentsRepository,
    );
  });

  it('should be able to create a new department', async () => {
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

    const product = await fakeProductsRepository.create({
      name: 'Doe Product',
      company: company.id,
    });

    const department = await createDepartment.execute({
      name: 'Doe Department',
      product_id: product.id,
    });

    expect(department).toHaveProperty('id');
  });

  it('should not be able to create a new department from a non existing product', async () => {
    await expect(
      createDepartment.execute({
        name: 'Doe Product',
        product_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
