import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import ListCompaniesService from './ListCompaniesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let listCompany: ListCompaniesService;

describe('ListCompanies', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCompaniesRepository = new FakeCompaniesRepository();

    listCompany = new ListCompaniesService(fakeCompaniesRepository);
  });

  it('should be able to list all companies', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const company_1 = await fakeCompaniesRepository.create({
      name: 'Doe Company',
      cnpj: '00099900099900',
      user: user.id,
    });

    const company_2 = await fakeCompaniesRepository.create({
      name: 'Doe Company',
      cnpj: '00099900099900',
      user: user.id,
    });

    const company_3 = await fakeCompaniesRepository.create({
      name: 'Doe Company',
      cnpj: '00099900099900',
      user: user.id,
    });

    const companies = await listCompany.execute([
      {
        id: company_1.id,
      },
      {
        id: company_2.id,
      },
      {
        id: company_3.id,
      },
    ]);
    expect(companies).toEqual([company_1, company_2, company_3]);
  });
});
