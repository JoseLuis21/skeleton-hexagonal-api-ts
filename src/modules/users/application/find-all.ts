import { BaseInfoTenant } from '../../shared/domain/tenant-types';
import { UserRepository } from '../domain/user.repository';

export class FindAllUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(baseInfoTenant: BaseInfoTenant) {
    return this.userRepository.findAll(baseInfoTenant);
  }
}
