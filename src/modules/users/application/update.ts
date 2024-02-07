import { type TenantConfig } from '@modules/shared/domain/tenant.types';
import { type User } from '@modules/users/domain/user.model';
import { type UserRepository } from '@modules/users/domain/user.repository';

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, user: User, id: number): Promise<User> {
    return this.userRepository.update(tenantConfig, user, id);
  }
}
