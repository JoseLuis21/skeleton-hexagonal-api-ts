import { UserRepository } from '../domain/user.repository';

export class FindAllUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.findAll();
  }
}
