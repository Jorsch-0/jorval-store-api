import { sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export class Jwt {
  static generateToken(payload: string | object, expiresIn?: string | number) {
    return sign(payload, secret, { expiresIn });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      verify(token, secret, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
