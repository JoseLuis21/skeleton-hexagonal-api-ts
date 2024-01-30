import { type User } from '../../domain/user.model';
import { type UserRepository } from '../../domain/user.repository';
import { type PrismaClientAdapter } from '../../../../internal/database/prisma/PrismaClientAdapter';
import { type TenantConfig } from '../../../shared/domain/tenant-types';

export class UserMysqlRepository implements UserRepository {
  constructor(private readonly prismaClientAdapter: PrismaClientAdapter) {}

  async create(tenantConfig: TenantConfig, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async update(tenantConfig: TenantConfig, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async delete(tenantConfig: TenantConfig, id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async findById(tenantConfig: TenantConfig, id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(tenantConfig: TenantConfig, email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findAll(tenantConfig: TenantConfig, cursor: number, pageLimit: number): Promise<User[]> {
    const prismaclient = await this.prismaClientAdapter.createInstance(tenantConfig);

    const users = await prismaclient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
      take: pageLimit,
      orderBy: { id: 'asc' },
      cursor: { id: cursor },
    });

    await prismaclient.$disconnect();

    return users;
  }
}
