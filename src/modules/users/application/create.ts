import { User } from '../domain/user.model';
import { UserRepository } from '../domain/user.repository';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User) {
    return this.userRepository.create(user);
  }
}
