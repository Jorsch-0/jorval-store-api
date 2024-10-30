import { Router } from 'express';
import { tryCatch } from '@/infrastructure/middlewares/try-catch';
import { create, getAll, getBySlug } from '../components/products/product.controller';
import { authenticate, authorize } from '@/infrastructure/permissions';

export async function productRoutes(mainRouter: Router) {
  const router = Router();

  mainRouter.use('/products', router);

  router.post('/', authenticate, authorize('ADMIN'), tryCatch(create));

  router.get('/', tryCatch(getAll));

  router.get('/:slug', tryCatch(getBySlug));
}
