import { type TenantConfig } from '@modules/shared/domain/tenant.types';
import { type User } from '@modules/users/domain/user.model';
import { type UserRepository } from '@modules/users/domain/user.repository';

export class FindByEmailUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, email: string): Promise<User | null> {
    return this.userRepository.findByEmail(tenantConfig, email);
  }
}
