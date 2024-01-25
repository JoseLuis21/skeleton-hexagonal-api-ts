import { UserRepository } from '../domain/user.repository';

export class FindByIdUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number) {
    return this.userRepository.findById(id);
  }
}
