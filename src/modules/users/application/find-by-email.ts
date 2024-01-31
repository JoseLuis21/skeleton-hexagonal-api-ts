import { type TenantConfig } from '../../shared/domain/tenant-types';
import { type User } from '../domain/user.model';
import { type UserRepository } from '../domain/user.repository';

export class FindByEmailUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(tenantConfig, email);
  }
}
