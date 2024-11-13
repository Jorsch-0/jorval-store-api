import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../modules/prisma';
import { Order } from '@/domain/entities/order.entity';
import { User } from '@/domain/entities/user.entity';
import { OrderFactory } from '../factories/order.factory';

export class OrderRepository {
  private readonly client: PrismaClient;

  constructor() {
    this.client = PrismaModule.getInstance();
  }

  async create(order: Order, user: User['toSafeObject']) {
    const orderCreated = await this.client.order.create({
      data: {
        details: JSON.stringify(order.toSafeObject.details),
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return OrderFactory.createFromDb(orderCreated);
  }

  async getAll(user: User) {
    const orders = await this.client.order.findMany({
      where: {
        User: {
          id: user.toSafeObject.id,
        },
      },
    });

    return orders.map((order) => OrderFactory.createFromDb(order));
  }

  async getById(id: string) {
    const order = await this.client.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      return null;
    }

    return OrderFactory.createFromDb(order);
  }
}
