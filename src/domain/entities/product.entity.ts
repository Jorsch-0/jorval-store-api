import { iEntity } from './iEntity';

export class Product extends iEntity {
  private id: string;
  private slug: string;
  private title: string;
  private description: string;
  private price: number;
  private stock: number;
  private images: string[];

  constructor(data: {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
  }) {
    super();
    this.id = data.id;
    this.slug = data.slug;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.stock = data.stock;
    this.images = data.images;
  }

  get toSafeObject() {
    return {
      id: this.id,
      slug: this.slug,
      title: this.title,
      description: this.description,
      price: this.price,
      stock: this.stock,
      images: this.images,
    };
  }

  setStock(stock: number) {
    this.stock = stock;
  }
}
