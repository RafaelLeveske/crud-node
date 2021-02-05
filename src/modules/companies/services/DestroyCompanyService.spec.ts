import AppError from '@shared/errors/AppError';
import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import DestroyCompanyService from './DestroyCompanyService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let destroyCompany: DestroyCompanyService;

describe('DestroyCompany', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCompaniesRepository = new FakeCompaniesRepository();

    destroyCompany = new DestroyCompanyService(fakeCompaniesRepository);
  });

  it('should be able to delete the company', async () => {
    const destroy = jest.spyOn(fakeCompaniesRepository, 'destroy');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const company = await fakeCompaniesRepository.create({
      name: 'Doe Company',
      cnpj: '00099900099901',
      user: user.id,
    });

    await destroyCompany.execute({
      company_id: company.id,
    });

    expect(destroy).toHaveBeenCalledWith(company);
  });

  it('should not be able to delete the company of a non-existing company', async () => {
    await expect(
      destroyCompany.execute({
        company_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
