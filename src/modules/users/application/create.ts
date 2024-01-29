import { TenantConfig } from '../../shared/domain/tenant-types';
import { User } from '../domain/user.model';
import { UserRepository } from '../domain/user.repository';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, user: User) {
    return this.userRepository.create(tenantConfig, user);
  }
}
