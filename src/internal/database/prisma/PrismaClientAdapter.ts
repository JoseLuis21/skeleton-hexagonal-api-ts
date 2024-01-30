import { PrismaClient } from '@prisma/client';
import { type TenantConfig } from '../../../modules/shared/domain/tenant-types';

const dataSources: Record<string, string | null> = {
  node_1_reader: process.env.MYSL_HOST_READ_1 ?? null,
  node_1_writter: process.env.MYSL_HOST_WRITE_1 ?? null,
  node_2_reader: process.env.MYSL_HOST_READ_2 ?? null,
  node_2_writter: process.env.MYSL_HOST_WRITE_2 ?? null,
};

export class PrismaClientAdapter {
  async createInstance(tenantConfig: TenantConfig): Promise<PrismaClient> {
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
      datasourceUrl: this.generateDataSourceUrl(tenantConfig),
    });
    await prisma.$connect();
    return prisma;
  }

  private generateDataSourceUrl(tenantConfig: TenantConfig): string {
    const { tenantName, tenantNode, tenantType } = tenantConfig;
    return dataSources[`node_${tenantNode}_${tenantType}`] + tenantName;
  }
}
