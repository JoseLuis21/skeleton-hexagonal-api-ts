import { User } from '../domain/user.model';
import { UserRepository } from '../domain/user.repository';

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User) {
    return this.userRepository.delete(user);
  }
}
