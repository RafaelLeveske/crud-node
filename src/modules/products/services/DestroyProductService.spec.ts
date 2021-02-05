import AppError from '@shared/errors/AppError';
import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import DestroyProductService from './DestroyProductService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let fakeProductsRepository: FakeProductsRepository;
let destroyProduct: DestroyProductService;

describe('DestroyProduct', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeProductsRepository = new FakeProductsRepository();

    destroyProduct = new DestroyProductService(fakeProductsRepository);
  });

  it('should be able to delete the product', async () => {
    const destroy = jest.spyOn(fakeProductsRepository, 'destroy');

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

    const product = await fakeProductsRepository.create({
      name: 'Doe Product',
      company: company.id,
    });

    await destroyProduct.execute({
      product_id: product.id,
    });

    expect(destroy).toHaveBeenCalledWith(product);
  });

  it('should not be able to delete the company of a non-existing company', async () => {
    await expect(
      destroyProduct.execute({
        product_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
