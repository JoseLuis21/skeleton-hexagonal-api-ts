import { type TenantConfig } from '@modules/shared/domain/tenant.types';

export interface Baserepository<T, Q> {
  create: (tenantConfig: TenantConfig, model: T) => Promise<T>;
  update: (tenantConfig: TenantConfig, model: T, id: number) => Promise<T>;
  delete: (tenantConfig: TenantConfig, id: Q) => Promise<T>;
  findById: (tenantConfig: TenantConfig, id: Q) => Promise<T | null>;
  findAll: (tenantConfig: TenantConfig, cursor: number, pageLimit: number) => Promise<T[]>;
}
