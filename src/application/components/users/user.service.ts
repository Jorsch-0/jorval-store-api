import { User } from '@/domain/entities/user.entity';
import { UserRepository } from '@/infrastructure/repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(user: User) {
    return this.userRepository.create(user);
  }

  async getByEmail(email: string) {
    return this.userRepository.getByEmail(email);
  }
}
