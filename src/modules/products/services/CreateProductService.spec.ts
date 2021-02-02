import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeProductsRepository: FakeProductsRepository;
let createUser: CreateUserService;
let createProduct: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeProductsRepository = new FakeProductsRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    createProduct = new CreateProductService(
      fakeUsersRepository,
      fakeProductsRepository,
    );
  });

  it('should be able to create a new product', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const product = await createProduct.execute({
      name: 'Doe Product',
      user_id: Object(user.id),
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a new product from a non existing company', async () => {
    await expect(
      createProduct.execute({
        name: 'Doe Product',
        user_id: Object(222),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
