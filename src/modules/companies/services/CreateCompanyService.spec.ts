import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import CreateCompanyService from './CreateCompanyService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let createCompany: CreateCompanyService;

describe('CreateCompany', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCompaniesRepository = new FakeCompaniesRepository();

    createCompany = new CreateCompanyService(
      fakeUsersRepository,
      fakeCompaniesRepository,
    );
  });

  it('should be able to create a new company', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const company = await createCompany.execute({
      name: 'Doe Company',
      cnpj: '00099900099900',
      user_id: user.id,
    });

    expect(company).toHaveProperty('id');
    expect(company).toHaveProperty('products');
  });

  it('should not be able to create a new company from a non existing user', async () => {
    await expect(
      createCompany.execute({
        name: 'Doe Company',
        cnpj: '00099900099909',
        user_id: 'non_user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
