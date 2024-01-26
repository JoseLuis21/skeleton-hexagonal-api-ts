import { BaseInfoTenant } from '../../shared/domain/tenant-types';
import { UserRepository } from '../domain/user.repository';

export class FindByIdUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(baseInfoTenant: BaseInfoTenant, id: number) {
    return this.userRepository.findById(baseInfoTenant, id);
  }
}
