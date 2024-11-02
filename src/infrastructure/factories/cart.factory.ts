import { Cart } from '@/domain/entities/cart.entity';
import { User } from '@/domain/entities/user.entity';
import {
  Cart as PrismaCart,
  User as PrismaUser,
  CartItem as PrismaCartItem,
  Product as PrismaProduct,
} from '@prisma/client';
import { v4 } from 'uuid';
import { UserFactory } from './user.factory';
import { CartItemFactory } from './cart-item.factory';

export class CartFactory {
  static createFromMinimalInputs(user: User) {
    return new Cart({
      id: v4(),
      User: user,
      CartItems: [],
    });
  }

  static createFromDb(
    data: PrismaCart & { User: PrismaUser; CartItems: (PrismaCartItem & { Product: PrismaProduct })[] }
  ) {
    return new Cart({
      ...data,
      User: UserFactory.createFromDb(data.User),
      CartItems: data.CartItems.map((item) => CartItemFactory.createFromDb(item)),
    });
  }
}
