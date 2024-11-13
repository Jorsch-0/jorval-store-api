import { ProductRepository } from '@/infrastructure/repositories/product.repository';
import { CreateProductSchema, GetProductsSchema } from './product.schemas';
import { ProductFactory } from '@/infrastructure/factories/product.factory';
import { CategoryService } from '../categories/category.service';
import { CustomError } from '@/domain/errors/custom.error';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async create(data: CreateProductSchema) {
    const categoryService = new CategoryService();

    const product = ProductFactory.createFromMinimalInputs(data);
    const category = await categoryService.getById(data.category);

    const productCreated = await this.productRepository.create(product, category);

    return productCreated;
  }

  async getAll(query: GetProductsSchema['query']) {
    const products = await this.productRepository.getAll(query);

    return products;
  }

  async getBySlug(slug: string) {
    const product = await this.productRepository.getBySlug(slug);

    if (!product) {
      throw CustomError.notFound('Product not found');
    }

    return product;
  }

  async reduceStock(slug: string, quantity: number) {
    const product = await this.getBySlug(slug);

    if (product.toSafeObject.stock < quantity) {
      throw CustomError.badRequest('Not enough stock');
    }
    const newStock = product.toSafeObject.stock - quantity;
    product.setStock(newStock);

    return this.productRepository.update(product);
  }
}
