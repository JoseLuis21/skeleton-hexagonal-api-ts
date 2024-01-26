export enum TenantType {
  WRITE = 'w',
  READ = 'r',
}

export interface BaseInfoTenant {
  tenantName: string;
  tenantNode: number;
  tenantType: TenantType;
}
