export type TenantType = 'writter' | 'reader';

export interface TenantConfig {
  tenantName: string;
  tenantNode: number;
  tenantType: TenantType;
}
