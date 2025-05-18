import { User } from './user.entity';

export abstract class IUserRepository {
  abstract save(user: User): Promise<User>;
  abstract findByEmail(email: string, companyId: string): Promise<User | null>;
}
