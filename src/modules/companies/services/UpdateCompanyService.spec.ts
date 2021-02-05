import AppError from '@shared/errors/AppError';
import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateCompanyService from './UpdateCompanyService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let updateCompany: UpdateCompanyService;

describe('UpdateCompany', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCompaniesRepository = new FakeCompaniesRepository();

    updateCompany = new UpdateCompanyService(fakeCompaniesRepository);
  });

  it('should be able to update the company', async () => {
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

    const updatedCompany = await updateCompany.execute({
      name: 'Doe Companion',
      cnpj: '00099900099902',
      company_id: company.id,
    });

    expect(updatedCompany?.name).toBe('Doe Companion');
    expect(updatedCompany?.cnpj).toBe('00099900099902');
  });

  it('should not be able to update the company of a non-existing company', async () => {
    await expect(
      updateCompany.execute({
        name: 'Doe Companion',
        cnpj: '00099900099902',
        company_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another company cnpj', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Test',
      email: 'johntest@example.com',
      password: '123456',
    });

    await fakeCompaniesRepository.create({
      name: 'Joe Company',
      cnpj: '00099900099901',
      user: user.id,
    });

    const company = await fakeCompaniesRepository.create({
      name: 'Doe Company',
      cnpj: '00099900099902',
      user: user.id,
    });

    await expect(
      updateCompany.execute({
        name: 'Doe Companion',
        cnpj: '00099900099901',
        company_id: company.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another company name', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Test',
      email: 'johntest@example.com',
      password: '123456',
    });

    await fakeCompaniesRepository.create({
      name: 'Joe Company',
      cnpj: '00099900099901',
      user: user.id,
    });

    const company = await fakeCompaniesRepository.create({
      name: 'Doe Company',
      cnpj: '00099900099902',
      user: user.id,
    });

    await expect(
      updateCompany.execute({
        name: 'Joe Company',
        cnpj: '00099900099903',
        company_id: company.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
