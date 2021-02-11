import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCompaniesRepository from '@modules/companies/repositories/fakes/FakeCompaniesRepository';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import UpdateProductService from './UpdateProductService';

let fakeUsersRepository: FakeUsersRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeCompaniesRepository: FakeCompaniesRepository;
let updateProduct: UpdateProductService;

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeCompaniesRepository = new FakeCompaniesRepository();

    updateProduct = new UpdateProductService(fakeProductsRepository);
  });

  it('should be able to update a product', async () => {
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

    const updatedProduct = await updateProduct.execute({
      name: 'Joe Product',
      product_id: product.id,
    });

    expect(updatedProduct?.name).toBe('Joe Product');
  });

  it('should not be able to update the product of a non-existing product', async () => {
    await expect(
      updateProduct.execute({
        name: 'Doe Companion',
        product_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
