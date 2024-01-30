import { type TenantConfig } from '../../shared/domain/tenant-types';
import { type User } from '../domain/user.model';
import { type UserRepository } from '../domain/user.repository';

export class FindAllUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, cursor: number, pageLimit: number): Promise<User[]> {
    return await this.userRepository.findAll(tenantConfig, cursor, pageLimit);
  }
}
