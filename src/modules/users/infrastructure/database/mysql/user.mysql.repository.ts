import { User } from '../../../domain/user.model';
import { UserRepository } from '../../../domain/user.repository';
import { PrismaClientAdapter } from '../../../../../internal/database/prisma/PrismaClientAdapter';
import { TenantConfig } from '../../../../shared/domain/tenant-types';

export class UserMysqlRepository implements UserRepository {
  constructor(private readonly prismaClientAdapter: PrismaClientAdapter) {}

  create(tenantConfig: TenantConfig, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(tenantConfig: TenantConfig, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(tenantConfig: TenantConfig, id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findById(tenantConfig: TenantConfig, id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(tenantConfig: TenantConfig, email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async findAll(tenantConfig: TenantConfig): Promise<User[]> {
    const prismaclient = await this.prismaClientAdapter.createInstance(
      tenantConfig.tenantName,
      tenantConfig.tenantNode,
      tenantConfig.tenantType,
    );
    const user: User[] = await prismaclient.user.findMany({
      select: {
        name: true,
        email: true,
        password: true,
      },
    });
    await prismaclient.$disconnect();
    return Promise.resolve(user);
  }
}
