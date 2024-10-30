import { CategoryFactory } from '@/infrastructure/factories/category.factory';
import { CreateCategorySchema } from './category.schemas';
import { CategoryRepository } from '@/infrastructure/repositories/category.repository';
import { CustomError } from '@/domain/errors/custom.error';

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async create(data: CreateCategorySchema) {
    const category = CategoryFactory.createFromMinimalInputs(data);

    const categoryCreated = await this.categoryRepository.create(category);

    return categoryCreated.toSafeObject;
  }

  async getAll() {
    const categories = await this.categoryRepository.getAll();

    return categories.map((category) => category.toSafeObject);
  }

  async getById(id: string) {
    const category = await this.categoryRepository.getById(id);

    if (!category) {
      throw CustomError.notFound('Category not found');
    }

    return category;
  }
}
