import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import CreateUserService from '../../users/services/CreateUserService';
import CreateCompanyService from './CreateCompanyService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let createCompany: CreateCompanyService;

describe('CreateCompany', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCompaniesRepository = new FakeCompaniesRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    createCompany = new CreateCompanyService(
      fakeUsersRepository,
      fakeCompaniesRepository,
    );
  });

  it('should be able to create a new company', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const company = await createCompany.execute({
      name: 'Doe Company',
      user_id: user.id,
    });

    expect(company).toHaveProperty('id');
  });

  it('should not be able to create a new company from a non existing user', async () => {
    await expect(
      createCompany.execute({
        name: 'Doe Company',
        user_id: Object(1222),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
