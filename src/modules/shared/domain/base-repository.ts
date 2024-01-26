import { BaseInfoTenant } from './base-info-tenant';

export interface Baserepository<T, Q> {
  create(model: T): Promise<T>;
  update(model: T): Promise<T>;
  delete(id: Q): Promise<boolean>;
  findById(id: Q): Promise<T>;
  findAll(baseInfoTenant: BaseInfoTenant): Promise<T[]>;
}
