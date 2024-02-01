export type TenantType = 'writter' | 'reader';

export interface TenantConfig {
  tenantName: string;
  tenantNode: number;
  tenantType: TenantType;
}

export interface TenantData {
  tenantName: string;
  tenantNode: number;
}
