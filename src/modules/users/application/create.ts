import { BaseInfoTenant } from '../../shared/domain/tenant-types';
import { User } from '../domain/user.model';
import { UserRepository } from '../domain/user.repository';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(baseInfoTenant: BaseInfoTenant, user: User) {
    return this.userRepository.create(baseInfoTenant, user);
  }
}
