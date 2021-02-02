import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import CreateCompanyService from './CreateCompanyService';
import ShowCompanyProfileService from './ShowCompanyProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCompaniesRepository: FakeCompaniesRepository;
let createUser: CreateUserService;
let createCompany: CreateCompanyService;
let showCompanyProfile: ShowCompanyProfileService;

describe('ShowCompanyProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCompaniesRepository = new FakeCompaniesRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createCompany = new CreateCompanyService(
      fakeUsersRepository,
      fakeCompaniesRepository,
    );
    showCompanyProfile = new ShowCompanyProfileService(fakeCompaniesRepository);
  });

  it('should be able to show the company profile', async () => {
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

    const companyProfile = await showCompanyProfile.execute({
      company_id: Object(company.id),
    });

    expect(companyProfile.name).toBe('Doe Company');
    expect(companyProfile.cnpj).toBe('00099900099900');
  });

  it('should not be able to show the profile of a non-existing user', async () => {
    expect(
      showCompanyProfile.execute({
        company_id: Object(22222),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});