import { type TenantConfig } from '../../shared/domain/tenant-types';
import { type UserRepository } from '../domain/user.repository';

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, id: number): Promise<boolean> {
    return await this.userRepository.delete(tenantConfig, id);
  }
}
