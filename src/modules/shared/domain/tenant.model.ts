import { BaseInfoTenant, TenantType } from './tenant-types';

export class Tenant {
  constructor(
    private readonly databaseName: string,
    private readonly databaseNode: number,
    private readonly databaseType: string,
  ) {
    this.databaseName = databaseName;
    this.databaseNode = databaseNode;
    this.databaseType = databaseType === 'r' ? TenantType.READ : TenantType.WRITE;
  }

  public getBaseInfoTentant(): BaseInfoTenant {
    return {
      tenantName: this.databaseName,
      tenantNode: this.databaseNode,
      tenantType: this.databaseType,
    };
  }
}
