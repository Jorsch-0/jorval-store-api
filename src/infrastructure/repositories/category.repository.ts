import { PrismaClient } from '@prisma/client';
import { PrismaModule } from '../modules/prisma';
import { Category } from '@/domain/entities/category.entity';
import { CategoryFactory } from '../factories/category.factory';

export class CategoryRepository {
  private readonly client: PrismaClient;

  constructor() {
    this.client = PrismaModule.getInstance();
  }

  async create({ toSafeObject: { id, name } }: Category) {
    const category = await this.client.category.create({
      data: {
        id,
        name,
      },
    });

    return CategoryFactory.createFromDb(category);
  }

  async getAll() {
    const categories = await this.client.category.findMany();

    return categories.map((category) => CategoryFactory.createFromDb(category));
  }

  async getById(id: string) {
    const category = await this.client.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return null;
    }

    return CategoryFactory.createFromDb(category);
  }
}
