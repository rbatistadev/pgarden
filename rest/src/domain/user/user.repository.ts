import { User } from './user.entity';

export const USER_REPOSITORY_INTERFACE = Symbol('IUserRepository');
export interface IUserRepository {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
