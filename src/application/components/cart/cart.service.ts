import { User } from '@/domain/entities/user.entity';
import { CartFactory } from '@/infrastructure/factories/cart.factory';
import { CartRepository } from '@/infrastructure/repositories/cart.repository';
import { UserService } from '../users/user.service';
import { CustomError } from '@/domain/errors/custom.error';
import { ProductService } from '../products/product.service';
import { OrderService } from '../orders/order.service';

export class CartService {
  private cartRepository: CartRepository;
  private userService: UserService;
  private productService: ProductService;
  private orderService: OrderService;

  constructor() {
    this.cartRepository = new CartRepository();
    this.userService = new UserService();
    this.productService = new ProductService();
    this.orderService = new OrderService();
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
    const productInCart = await this.cartRepository.getCartItemByProduct(cart, product);

    if (product.toSafeObject.stock < quantity) {
      throw CustomError.badRequest('Not enough stock');
    }

    if (productInCart) {
      const newQuantity = productInCart.toSafeObject.quantity + quantity;
      if (product.toSafeObject.stock < newQuantity) {
        throw CustomError.badRequest('Not enough stock');
      }
      productInCart.setQuantity(newQuantity);
      this.cartRepository.updateCartItem(productInCart);
    } else {
      this.cartRepository.createCartItem(cart, product, quantity);
    }
  }

  async removeProduct(userEmail: string, productSlug: string, quantity: number) {
    const cart = await this.getByUserEmail(userEmail);
    const product = await this.productService.getBySlug(productSlug);
    const productInCart = await this.cartRepository.getCartItemByProduct(cart, product);

    if (!productInCart) {
      throw CustomError.notFound('Product not found in cart');
    } else if (productInCart.toSafeObject.quantity > quantity) {
      const newQuantity = productInCart.toSafeObject.quantity - quantity;
      productInCart.setQuantity(newQuantity);
      this.cartRepository.updateCartItem(productInCart);
    } else {
      this.cartRepository.deleteCartItem(productInCart);
    }
  }

  async checkout(userEmail: string) {
    const cart = await this.getByUserEmail(userEmail);
    const cartItems = cart.toSafeObject.CartItems;

    for (const cartItem of cartItems) {
      await this.productService.reduceStock(cartItem.toSafeObject.Product.slug, cartItem.toSafeObject.quantity);
      await this.cartRepository.deleteCartItem(cartItem);
    }

    return this.orderService.create(cart);
  }
}
