import { type TenantConfig } from '../../shared/domain/tenant-types';
import { type Baserepository } from '../../shared/domain/base.repository';
import { type User } from './user.model';

export interface UserRepository extends Baserepository<User, number> {
  findByEmail: (tenantConfig: TenantConfig, email: string) => Promise<User>;
}
