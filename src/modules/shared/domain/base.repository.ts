import { type TenantConfig } from '@modules/shared/domain/tenant.types';
import type IResult from '../application/result.interface';

export interface Baserepository<T, Q> {
  create: (tenantConfig: TenantConfig, model: T) => Promise<IResult<T>>;
  update: (tenantConfig: TenantConfig, model: T, id: number) => Promise<IResult<T>>;
  delete: (tenantConfig: TenantConfig, id: Q) => Promise<IResult<T>>;
  findById: (tenantConfig: TenantConfig, id: Q) => Promise<IResult<T | null>>;
  findAll: (tenantConfig: TenantConfig, cursor: number, pageLimit: number) => Promise<IResult<T>>;
}
