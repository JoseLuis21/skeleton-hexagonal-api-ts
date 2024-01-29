import { TenantConfig } from '../../shared/domain/tenant-types';
import { UserRepository } from '../domain/user.repository';

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, id: number) {
    return this.userRepository.delete(tenantConfig, id);
  }
}
