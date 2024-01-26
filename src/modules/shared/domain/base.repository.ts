import { BaseInfoTenant } from './tenant-types';

export interface Baserepository<T, Q> {
  create(baseInfoTenant: BaseInfoTenant, model: T): Promise<T>;
  update(baseInfoTenant: BaseInfoTenant, model: T): Promise<T>;
  delete(baseInfoTenant: BaseInfoTenant, id: Q): Promise<boolean>;
  findById(baseInfoTenant: BaseInfoTenant, id: Q): Promise<T>;
  findAll(baseInfoTenant: BaseInfoTenant): Promise<T[]>;
}
