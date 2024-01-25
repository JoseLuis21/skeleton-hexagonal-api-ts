import { Baserepository } from '../../shared/domain/base-repository';
import { User } from './user.model';

export interface UserRepository extends Baserepository<User, number> {
  findByEmail(email: string): Promise<User>;
}
