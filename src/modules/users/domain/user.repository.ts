import { TenantConfig } from '../../shared/domain/tenant-types';
import { Baserepository } from '../../shared/domain/base.repository';
import { User } from './user.model';

export interface UserRepository extends Baserepository<User, number> {
  findByEmail(tenantConfig: TenantConfig, email: string): Promise<User>;
}
