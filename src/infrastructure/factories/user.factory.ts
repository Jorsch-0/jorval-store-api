import { SignupSchema } from '@/application/components/auth/auth.schemas';
import { User } from '@/domain/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';
import { v4 } from 'uuid';

export class UserFactory {
  static createFromMinimalInputs(inputs: SignupSchema) {
    return new User({
      id: v4(),
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      role: 'USER',
    });
  }

  static createFromDb(data: PrismaUser) {
    return new User(data);
  }
}
