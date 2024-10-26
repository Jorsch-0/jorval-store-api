import { CreateCategorySchema } from '@/application/components/categories/category.schemas';
import { Category } from '@/domain/entities/category.entity';
import { Category as PrismaCategory } from '@prisma/client';
import { v4 } from 'uuid';

export class CategoryFactory {
  static createFromMinimalInputs(inputs: CreateCategorySchema) {
    return new Category({
      id: v4(),
      name: inputs.name,
    });
  }

  static createFromDb(data: PrismaCategory) {
    return new Category(data);
  }
}
