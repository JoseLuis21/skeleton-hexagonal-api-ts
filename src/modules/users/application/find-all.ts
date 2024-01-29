import { TenantConfig } from '../../shared/domain/tenant-types';
import { UserRepository } from '../domain/user.repository';

export class FindAllUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, cursor: number, pageLimit: number) {
    return this.userRepository.findAll(tenantConfig, cursor, pageLimit);
  }
}
