import { Bcrypt } from '@/infrastructure/utils/bcrypt';
import { Role } from '@prisma/client';

export class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private role: Role;

  constructor(data: { id: string; name: string; email: string; password: string; role: Role }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
  }

  get toSafeObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }

  hashPassword() {
    this.password = Bcrypt.hash(this.password);
  }

  isValidPassword(password: string) {
    return Bcrypt.compare(password, this.password);
  }

  getPassword() {
    return this.password;
  }
}
