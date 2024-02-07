import { type TenantConfig } from '@modules/shared/domain/tenant.types';
import { type User } from '@modules/users/domain/user.model';
import { type UserRepository } from '@modules/users/domain/user.repository';

export class FindByIdUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, id: number): Promise<User | null> {
    return this.userRepository.findById(tenantConfig, id);
  }
}
