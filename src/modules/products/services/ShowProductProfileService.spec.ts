import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import ShowProductProfileService from './ShowProductProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let showProductProfile: ShowProductProfileService;

describe('ShowProduct', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeCompaniesRepository = new FakeCompaniesRepository();

    showProductProfile = new ShowProductProfileService(fakeProductsRepository);
  });

  it('should be able to show a product', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
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

    const productProfile = await showProductProfile.execute({
      product_id: product.id,
    });

    expect(productProfile.name).toBe('Doe Product');
  });

  it('should not be able to show the product profile from a non-existing product', async () => {
    expect(
      showProductProfile.execute({
        product_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
