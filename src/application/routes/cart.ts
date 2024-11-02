import { Router } from 'express';
import { tryCatch } from '@/infrastructure/middlewares/try-catch';
import { addProductToCart, getCart, removeProductFromCart } from '../components/cart/cart.controller';
import { authenticate } from '@/infrastructure/permissions';

export async function cartRoutes(mainRouter: Router) {
  const router = Router();

  mainRouter.use('/cart', router);

  router.get('/', authenticate, tryCatch(getCart));

  router.post('/add', authenticate, tryCatch(addProductToCart));

  router.post('/remove', authenticate, tryCatch(removeProductFromCart));
}
