import { Router } from 'express';
import { tryCatch } from '@/infrastructure/middlewares/try-catch';
import { authenticate } from '@/infrastructure/permissions';
import { getOrders } from '../components/orders/order.controller';

export async function orderRoutes(mainRouter: Router) {
  const router = Router();

  mainRouter.use('/orders', router);

  router.get('/', authenticate, tryCatch(getOrders));
}
