import { TenantConfig } from './tenant-types';

export interface Baserepository<T, Q> {
  create(tenantConfig: TenantConfig, model: T): Promise<T>;
  update(tenantConfig: TenantConfig, model: T): Promise<T>;
  delete(tenantConfig: TenantConfig, id: Q): Promise<boolean>;
  findById(tenantConfig: TenantConfig, id: Q): Promise<T>;
  findAll(tenantConfig: TenantConfig, cursor: number, pageLimit: number): Promise<T[]>;
}
