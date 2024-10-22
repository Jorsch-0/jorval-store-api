import { Request, Response } from 'express';
import { loginSchema, signupSchema } from './auth.schemas';
import { AuthService } from './auth.service';

const tokenExpirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
const secureCookie = process.env.NODE_ENV === 'production';

const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
  const data = signupSchema.parse(req.body);

  const { user, token } = await authService.signup(data);

  res.cookie('jwt', token, { expires: tokenExpirationDate, httpOnly: true, secure: secureCookie });
  res.status(201).json({ user });
};

export const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);

  const { user, token } = await authService.login(data);

  res.cookie('jwt', token, { expires: tokenExpirationDate, httpOnly: true, secure: secureCookie });
  res.status(200).json({ user });
};
