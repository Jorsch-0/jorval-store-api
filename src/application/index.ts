import { Application, Router } from 'express';
import { authRoutes } from './routes/auth';
import { CustomError } from '@/domain/errors/custom.error';
import { categoryRoutes } from './routes/category';
import { productRoutes } from './routes/product';
import { cartRoutes } from './routes/cart';
import { orderRoutes } from './routes/order';

export async function routes(app: Application) {
  const router = Router();

  app.use('/api', router);

  router.get('/', (_req, res) => {
    res.send('Hello World');
  });

  authRoutes(router);
  categoryRoutes(router);
  productRoutes(router);
  cartRoutes(router);
  orderRoutes(router);

  router.all('*', (_req, _res, next) => {
    const err = CustomError.notFound('Not found');

    next(err);
  });

  return router;
}
