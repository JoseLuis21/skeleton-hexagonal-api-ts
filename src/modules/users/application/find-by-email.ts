import { UserRepository } from '../domain/user.repository';

export class FindByEmailUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
