import { OrderFactory } from '@/infrastructure/factories/order.factory';
import { CustomError } from '@/domain/errors/custom.error';
import { OrderRepository } from '@/infrastructure/repositories/order.repository';
import { UserService } from '../users/user.service';
import { Cart } from '@/domain/entities/cart.entity';

export class OrderService {
  private orderRepository: OrderRepository;
  private userService: UserService;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.userService = new UserService();
  }

  async create(cart: Cart) {
    const order = OrderFactory.createFromMinimalInputs(cart.toSafeObject.CartItems);

    const user = cart.getUser();

    const orderCreated = await this.orderRepository.create(order, user);

    return orderCreated;
  }

  async getAll(email: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw CustomError.notFound('User not found');
    }

    const orders = await this.orderRepository.getAll(user);

    return orders;
  }

  async getById(id: string) {
    const order = await this.orderRepository.getById(id);

    if (!order) {
      throw CustomError.notFound('Order not found');
    }

    return order;
  }
}
