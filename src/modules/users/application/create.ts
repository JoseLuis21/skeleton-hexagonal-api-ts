import { type TenantConfig } from '../../shared/domain/tenant-types';
import { type User } from '../domain/user.model';
import { type UserRepository } from '../domain/user.repository';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(tenantConfig: TenantConfig, user: User): Promise<User> {
    return await this.userRepository.create(tenantConfig, user);
  }
}
