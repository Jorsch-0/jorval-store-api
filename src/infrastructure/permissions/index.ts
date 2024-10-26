import { CustomError } from '@/domain/errors/custom.error';
import { Request, Response, NextFunction } from 'express';
import { Jwt } from '../utils/jwt';
import { User } from '@/domain/entities/user.entity';
import { Role } from '@prisma/client';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw CustomError.unauthorized('Unauthorized');
    }

    const payload = await Jwt.validateToken<User['toSafeObject']>(token);
    if (!payload) {
      res.cookie('jwt', '', { maxAge: 1 });
      throw CustomError.unauthorized('Invalid token');
    }

    req.body.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};

export const authorize = (role: Role) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.body.user;
    if (user.role !== role) {
      throw CustomError.unauthorized('Unauthorized');
    }
    next();
  };
};
