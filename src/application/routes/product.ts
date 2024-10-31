import { Router } from 'express';
import { tryCatch } from '@/infrastructure/middlewares/try-catch';
import { createProduct, getProducts, getProduct } from '../components/products/product.controller';
import { authenticate, authorize } from '@/infrastructure/permissions';

export async function productRoutes(mainRouter: Router) {
  const router = Router();

  mainRouter.use('/products', router);

  router.post('/', authenticate, authorize('ADMIN'), tryCatch(createProduct));

  router.get('/', tryCatch(getProducts));

  router.get('/:slug', tryCatch(getProduct));
}
