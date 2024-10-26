import { PrismaModule } from '../modules/prisma';
import { PrismaClient } from '@prisma/client';
import { User } from '@/domain/entities/user.entity';
import { UserFactory } from '../factories/user.factory';

export class UserRepository {
  private readonly client: PrismaClient;

  constructor() {
    this.client = PrismaModule.getInstance();
  }

  async create(data: User) {
    const user = await this.client.user.create({
      data: {
        name: data.toSafeObject.name,
        email: data.toSafeObject.email,
        password: data.getPassword(),
      },
    });

    return UserFactory.createFromDb(user);
  }

  async getByEmail(email: string) {
    const user = await this.client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return UserFactory.createFromDb(user);
  }

  async getById(id: string) {
    const user = await this.client.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return UserFactory.createFromDb(user);
  }
}
