import { iEntity } from './iEntity';
import { Product } from './product.entity';

export class CartItem extends iEntity {
  private id: string;
  private quantity: number;
  private Product: Product;

  constructor(data: { id: string; quantity: number; Product: Product }) {
    super();
    this.id = data.id;
    this.quantity = data.quantity;
    this.Product = data.Product;
  }

  get toSafeObject() {
    return {
      id: this.id,
      quantity: this.quantity,
      Product: this.Product.toSafeObject,
    };
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }
}
