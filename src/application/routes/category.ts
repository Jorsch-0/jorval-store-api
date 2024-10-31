import { Router } from 'express';
import { tryCatch } from '@/infrastructure/middlewares/try-catch';
import { createCategory, getCategories } from '../components/categories/category.controller';
import { authenticate, authorize } from '@/infrastructure/permissions';

export async function categoryRoutes(mainRouter: Router) {
  const router = Router();

  mainRouter.use('/categories', router);

  router.post('/', authenticate, authorize('ADMIN'), tryCatch(createCategory));

  router.get('/', tryCatch(getCategories));
}
