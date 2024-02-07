import { type TenantConfig } from '@modules/shared/domain/tenant.types';
import { type User } from '@modules/users/domain/user.model';
import { type UserRepository } from '@modules/users/domain/user.repository';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, user: User): Promise<User> {
    return this.userRepository.create(tenantConfig, user);
  }
}
