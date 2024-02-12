import { type TenantConfig } from '@modules/shared/domain/tenant.types';
import { type Baserepository } from '@modules/shared/domain/base.repository';
import { type User } from '@modules/users/domain/user.model';
import type IResult from '@modules/shared/application/result.interface';

export interface UserRepository extends Baserepository<User, number> {
  findByEmail: (tenantConfig: TenantConfig, email: string) => Promise<IResult<User | null>>;
}
