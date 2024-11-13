import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../modules/prisma';
import { CartFactory } from '../factories/cart.factory';
import { Cart } from '@/domain/entities/cart.entity';
import { User } from '@/domain/entities/user.entity';
import { Product } from '@/domain/entities/product.entity';
import { CartItemFactory } from '../factories/cart-item.factory';
import { CartItem } from '@/domain/entities/cart-item.entity';

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

  async getCartItemByProduct(cart: Cart, product: Product) {
    const cartItem = await this.client.cartItem.findUnique({
      where: {
        productId_cartId: {
          productId: product.toSafeObject.id,
          cartId: cart.toSafeObject.id,
        },
      },
      include: {
        Product: true,
      },
    });

    if (!cartItem) {
      return null;
    }

    return CartItemFactory.createFromDb(cartItem);
  }

  async createCartItem(cart: Cart, product: Product, quantity: number) {
    await this.client.cartItem.create({
      data: {
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

  async updateCartItem(cartItem: CartItem) {
    await this.client.cartItem.update({
      where: {
        id: cartItem.toSafeObject.id,
      },
      data: {
        quantity: cartItem.toSafeObject.quantity,
      },
    });
  }

  async deleteCartItem(cartItem: CartItem) {
    await this.client.cartItem.delete({
      where: {
        id: cartItem.toSafeObject.id,
      },
    });
  }
}
