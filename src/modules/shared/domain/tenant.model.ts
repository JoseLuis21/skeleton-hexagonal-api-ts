import { type TenantConfig, type TenantType } from '@modules/shared/domain/tenant.types';

export class Tenant {
  constructor(
    private readonly tenantName: string,
    private readonly tenantNode: number,
    private readonly tenantType: TenantType,
  ) {
    this.tenantName = tenantName;
    this.tenantNode = tenantNode;
    this.tenantType = tenantType;
  }

  public getBaseInfoTentant(): TenantConfig {
    return {
      tenantName: this.tenantName,
      tenantNode: this.tenantNode,
      tenantType: this.tenantType,
    };
  }
}
