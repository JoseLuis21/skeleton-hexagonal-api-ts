import { PrismaClient } from '@prisma/client';
import { type TenantConfig } from '@modules/shared/domain/tenant.types';
import { variablesEnvs } from '@internal/environment/variables';

const dataSources: Record<string, string | null> = {
  node_1_reader: variablesEnvs.MYSQL_HOST_READ_1,
  node_1_writter: variablesEnvs.MYSQL_HOST_WRITE_1,
  node_2_reader: variablesEnvs.MYSQL_HOST_READ_2,
  node_2_writter: variablesEnvs.MYSQL_HOST_WRITE_2,
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
