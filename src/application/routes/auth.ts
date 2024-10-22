import { Router } from 'express';
import { login, signup } from '../components/auth/auth.controller';
import { tryCatch } from '@/infrastructure/middlewares/try-catch';

export async function authRoutes(mainRouter: Router) {
  const router = Router();

  mainRouter.use('/auth', router);

  router.post('/signup', tryCatch(signup));

  router.post('/login', tryCatch(login));
}
