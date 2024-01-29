import { PrismaClient } from '@prisma/client';
import { TenantConfig } from '../../../modules/shared/domain/tenant-types';

const dataSources: { [key: string]: string } = {
  node_1_reader: process.env.MYSL_HOST_READ_1 || '',
  node_1_writter: process.env.MYSL_HOST_WRITE_1 || '',
  node_2_reader: process.env.MYSL_HOST_READ_2 || '',
  node_2_writter: process.env.MYSL_HOST_WRITE_2 || '',
};

export class PrismaClientAdapter {
  private prisma: PrismaClient;

  async createInstance(tenantConfig: TenantConfig): Promise<PrismaClient> {
    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
      datasourceUrl: this.generateDataSourceUrl(tenantConfig),
    });
    await this.prisma.$connect();
    return this.prisma;
  }

  private generateDataSourceUrl(tenantConfig: TenantConfig): string {
    const { tenantName, tenantNode, tenantType } = tenantConfig;
    console.log({ tenantName, tenantNode, tenantType });
    return dataSources['node_' + tenantNode + '_' + tenantType] + tenantName;
  }
}
