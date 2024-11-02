import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../modules/prisma';
import { CartFactory } from '../factories/cart.factory';
import { Cart } from '@/domain/entities/cart.entity';
import { User } from '@/domain/entities/user.entity';
import { Product } from '@/domain/entities/product.entity';

export class CartRepository {
  private readonly client: PrismaClient;

  constructor() {
    this.client = PrismaModule.getInstance();
  }

  async create(cart: Cart) {
    const user = cart.getUser();

    const cartCreated = await this.client.cart.create({
      data: {
        User: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        User: true,
        CartItems: {
          include: {
            Product: true,
          },
        },
      },
    });

    return CartFactory.createFromDb(cartCreated);
  }

  async getByUser(user: User) {
    const cart = await this.client.cart.findUnique({
      where: {
        userId: user.toSafeObject.id,
      },
      include: {
        User: true,
        CartItems: {
          include: {
            Product: true,
          },
        },
      },
    });

    return cart ? CartFactory.createFromDb(cart) : null;
  }

  async addProduct(cart: Cart, product: Product, quantity: number) {
    await this.client.cartItem.upsert({
      where: {
        productId_cartId: {
          productId: product.toSafeObject.id,
          cartId: cart.toSafeObject.id,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        quantity,
        Product: {
          connect: {
            id: product.toSafeObject.id,
          },
        },
        Cart: {
          connect: {
            id: cart.toSafeObject.id,
          },
        },
      },
    });
  }

  async removeProduct(cart: Cart, product: Product, quantity: number) {
    const cartItem = await this.client.cartItem.findUnique({
      where: {
        productId_cartId: {
          productId: product.toSafeObject.id,
          cartId: cart.toSafeObject.id,
        },
      },
    });

    if (!cartItem) {
      return;
    } else if (cartItem.quantity <= quantity) {
      await this.client.cartItem.delete({
        where: {
          productId_cartId: {
            productId: product.toSafeObject.id,
            cartId: cart.toSafeObject.id,
          },
        },
      });
    } else {
      await this.client.cartItem.update({
        where: {
          productId_cartId: {
            productId: product.toSafeObject.id,
            cartId: cart.toSafeObject.id,
          },
        },
        data: {
          quantity: {
            decrement: quantity,
          },
        },
      });
    }
  }
}
