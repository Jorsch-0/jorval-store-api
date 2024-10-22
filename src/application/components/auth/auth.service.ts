import { LoginSchema, SignupSchema } from './auth.schemas';
import { Jwt } from '@/infrastructure/utils/jwt';
import { UserRepository } from '@/infrastructure/repositories/user.repository';
import { CustomError } from '@/domain/errors/custom.error';
import { UserFactory } from '@/infrastructure/factories/user.factory';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data: SignupSchema) {
    const user = await this.userRepository.getByEmail(data.email);
    if (user) {
      throw CustomError.badRequest('User already exists');
    }

    const newUser = UserFactory.createFromMinimalInputs(data);
    newUser.hashPassword();

    const userCreated = await this.userRepository.create(newUser);

    const token = Jwt.generateToken(userCreated.toSafeObject, '1d');

    return { user: userCreated.toSafeObject, token };
  }

  async login(data: LoginSchema) {
    const user = await this.userRepository.getByEmail(data.email);
    if (!user) {
      throw CustomError.notFound('User not found');
    }

    const isValidPassword = user.isValidPassword(data.password);
    if (!isValidPassword) {
      throw CustomError.unauthorized('Invalid credentials');
    }

    const token = Jwt.generateToken(user.toSafeObject, '1d');

    return { user: user.toSafeObject, token };
  }
}
