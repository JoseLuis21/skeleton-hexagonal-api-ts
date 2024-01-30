import { type TenantConfig, type TenantType } from './tenant-types';

export class Tenant {
  constructor(
    private readonly databaseName: string,
    private readonly databaseNode: number,
    private readonly databaseType: TenantType,
  ) {
    this.databaseName = databaseName;
    this.databaseNode = databaseNode;
    this.databaseType = databaseType;
  }

  public getBaseInfoTentant(): TenantConfig {
    return {
      tenantName: this.databaseName,
      tenantNode: this.databaseNode,
      tenantType: this.databaseType,
    };
  }
}
