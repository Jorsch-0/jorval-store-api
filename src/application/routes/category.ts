import { Router } from 'express';
import { tryCatch } from '@/infrastructure/middlewares/try-catch';
import { create, getAll } from '../components/categories/category.controller';

export async function categoryRoutes(mainRouter: Router) {
  const router = Router();

  mainRouter.use('/categories', router);

  router.post('/', tryCatch(create));

  router.get('/', tryCatch(getAll));
}
