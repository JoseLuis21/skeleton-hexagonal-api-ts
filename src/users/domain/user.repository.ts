import { User } from './user.model';

export interface UserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(user: User): Promise<boolean>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
}
