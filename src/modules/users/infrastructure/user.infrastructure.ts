import { User } from '../domain/user.model';
import { UserRepository } from '../domain/user.repository';

export class UserInfrastructure implements UserRepository {
  create(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> {
    const user = new User('jose', 'jose@jose.cl', '123456');
    return Promise.resolve([user]);
  }
}
