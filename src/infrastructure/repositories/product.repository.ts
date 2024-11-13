import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaModule } from '../modules/prisma';
import { Product } from '@/domain/entities/product.entity';
import { Category } from '@/domain/entities/category.entity';
import { ProductFactory } from '../factories/product.factory';
import { GetProductsSchema } from '@/application/components/products/product.schemas';

export class ProductRepository {
  private readonly client: PrismaClient;

  constructor() {
    this.client = PrismaModule.getInstance();
  }

  async create(product: Product, category: Category) {
    const slugCount = await this.client.product.count({
      where: {
        slug: {
          contains: product.toSafeObject.slug,
        },
      },
    });

    const slug = slugCount > 0 ? `${product.toSafeObject.slug}-${slugCount}` : product.toSafeObject.slug;

    const newProduct = await this.client.product.create({
      data: {
        slug: slug,
        title: product.toSafeObject.title,
        description: product.toSafeObject.description,
        price: product.toSafeObject.price,
        stock: product.toSafeObject.stock,
        images: product.toSafeObject.images,
        Category: { connect: { id: category.toSafeObject.id } },
      },
    });

    return ProductFactory.createFromDb(newProduct);
  }

  async getAll(query: GetProductsSchema['query']) {
    const skip = (query.page - 1) * query.limit;

    const whereConditions: Prisma.ProductWhereInput = {
      Category: {
        id: query.category,
      },
      OR: [
        {
          title: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          slug: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          Category: {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
      ],
    };

    const total = await this.client.product.count({
      where: whereConditions,
    });

    const products = await this.client.product
      .findMany({
        skip,
        take: query.limit,
        where: whereConditions,
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then((products) => products.map((product) => ProductFactory.createFromDb(product)));

    return { products, total };
  }

  async getBySlug(slug: string) {
    const product = await this.client.product.findUnique({
      where: {
        slug,
      },
    });

    if (!product) {
      return null;
    }

    return ProductFactory.createFromDb(product);
  }

  async update(product: Product) {
    const updatedProduct = await this.client.product.update({
      where: {
        id: product.toSafeObject.id,
      },
      data: {
        title: product.toSafeObject.title,
        description: product.toSafeObject.description,
        price: product.toSafeObject.price,
        stock: product.toSafeObject.stock,
        images: product.toSafeObject.images,
      },
    });

    return ProductFactory.createFromDb(updatedProduct);
  }
}
