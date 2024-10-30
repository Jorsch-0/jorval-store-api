import { CreateProductSchema } from '@/application/components/products/product.schemas';
import { Product } from '@/domain/entities/product.entity';
import { Product as PrismaProduct } from '@prisma/client';
import { v4 } from 'uuid';

export class ProductFactory {
  private static generateSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
  }

  static createFromMinimalInputs(inputs: CreateProductSchema) {
    return new Product({
      id: v4(),
      slug: this.generateSlug(inputs.title),
      title: inputs.title,
      description: inputs.description,
      price: inputs.price,
      stock: inputs.stock,
      images: inputs.images,
    });
  }

  static createFromDb(data: PrismaProduct) {
    return new Product(data);
  }
}
