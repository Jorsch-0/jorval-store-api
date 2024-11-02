import { User } from '@/domain/entities/user.entity';
import { CartFactory } from '@/infrastructure/factories/cart.factory';
import { CartRepository } from '@/infrastructure/repositories/cart.repository';
import { UserService } from '../users/user.service';
import { CustomError } from '@/domain/errors/custom.error';
import { ProductService } from '../products/product.service';

export class CartService {
  private cartRepository: CartRepository;
  private userService: UserService;
  private productService: ProductService;

  constructor() {
    this.cartRepository = new CartRepository();
    this.userService = new UserService();
    this.productService = new ProductService();
  }

  async create(user: User) {
    const cart = CartFactory.createFromMinimalInputs(user);

    return this.cartRepository.create(cart);
  }

  async getByUserEmail(email: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw CustomError.notFound('User not found');
    }

    const cart = await this.cartRepository.getByUser(user);
    if (!cart) {
      throw CustomError.notFound('Cart not found');
    }

    return cart;
  }

  async addProduct(userEmail: string, productSlug: string, quantity: number) {
    const cart = await this.getByUserEmail(userEmail);
    const product = await this.productService.getBySlug(productSlug);

    return this.cartRepository.addProduct(cart, product, quantity);
  }

  async removeProduct(userEmail: string, productSlug: string, quantity: number) {
    const cart = await this.getByUserEmail(userEmail);
    const product = await this.productService.getBySlug(productSlug);

    return this.cartRepository.removeProduct(cart, product, quantity);
  }
}
