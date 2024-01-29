import { TenantConfig } from '../../shared/domain/tenant-types';
import { UserRepository } from '../domain/user.repository';

export class FindByEmailUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, email: string) {
    return this.userRepository.findByEmail(tenantConfig, email);
  }
}
