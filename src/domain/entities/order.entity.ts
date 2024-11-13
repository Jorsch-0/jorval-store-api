import { Cart } from './cart.entity';
import { iEntity } from './iEntity';

export type OrderDetails = {
  products: Cart['toSafeObject']['CartItems'];
  total: number;
};

export class Order extends iEntity {
  private id: string;
  private details: OrderDetails;

  constructor(data: { id: string; details: OrderDetails }) {
    super();
    this.id = data.id;
    this.details = data.details;
  }

  get toSafeObject() {
    return {
      id: this.id,
      details: this.details,
    };
  }
}
