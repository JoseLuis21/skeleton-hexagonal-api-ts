import { PrismaClient } from '@prisma/client';

const dataSources: { [key: string]: string } = {
  node_1_r: process.env.MYSL_HOST_READ_1 || '',
  node_1_w: process.env.MYSL_HOST_WRITE_1 || '',
  node_2_r: process.env.MYSL_HOST_READ_2 || '',
  node_2_w: process.env.MYSL_HOST_WRITE_2 || '',
};

export class PrismaClientAdapter {
  private prisma: PrismaClient;

  async createInstance(nameDatabase: string, nodeDatabase: number, typeDatabase: string): Promise<PrismaClient> {
    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
      datasourceUrl: this.generateDataSourceUrl(nameDatabase, nodeDatabase, typeDatabase),
    });
    await this.prisma.$connect();
    return this.prisma;
  }

  private generateDataSourceUrl(nameDatabase: string, nodeDatabase: number, typeDatabase: string): string {
    return dataSources['node_' + nodeDatabase + '_' + typeDatabase] + nameDatabase;
  }
}
