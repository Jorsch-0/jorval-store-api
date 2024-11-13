import { CartItem } from '@/domain/entities/cart-item.entity';
import { Cart } from '@/domain/entities/cart.entity';
import { Order, OrderDetails } from '@/domain/entities/order.entity';
import { Order as PrismaOrder } from '@prisma/client';
import { v4 } from 'uuid';

export class OrderFactory {
  static createFromMinimalInputs(cartItems: CartItem[]) {
    const total = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.toSafeObject.quantity * cartItem.toSafeObject.Product.price,
      0
    );

    return new Order({
      id: v4(),
      details: {
        products: cartItems,
        total,
      },
    });
  }

  static createFromDb(data: PrismaOrder) {
    return new Order({
      id: data.id,
      details: JSON.parse(data.details as string),
    });
  }
}
