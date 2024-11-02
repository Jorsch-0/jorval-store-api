import { CartItem as PrismaCartItem, Product as PrismaProduct } from '@prisma/client';
import { v4 } from 'uuid';
import { CartItem } from '@/domain/entities/cart-item.entity';
import { Product } from '@/domain/entities/product.entity';
import { ProductFactory } from './product.factory';

export class CartItemFactory {
  static createFromMinimalInputs(quantity: number, product: Product) {
    return new CartItem({
      id: v4(),
      quantity,
      Product: product,
    });
  }

  static createFromDb(data: PrismaCartItem & { Product: PrismaProduct }) {
    return new CartItem({
      ...data,
      Product: ProductFactory.createFromDb(data.Product),
    });
  }
}
