import { BaseInfoTenant } from '../../shared/domain/tenant-types';
import { UserRepository } from '../domain/user.repository';

export class FindByEmailUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(baseInfoTenant: BaseInfoTenant, email: string) {
    return this.userRepository.findByEmail(baseInfoTenant, email);
  }
}
