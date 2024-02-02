import { type User } from '../../domain/user.model';
import { type UserRepository } from '../../domain/user.repository';
import { type PrismaClientAdapter } from '../../../../internal/database/prisma/prisma.client.adapter';
import { type TenantConfig } from '../../../shared/domain/tenant.types';

export class UserMysqlRepository implements UserRepository {
  constructor(private readonly prismaClientAdapter: PrismaClientAdapter) {}

  async create(tenantConfig: TenantConfig, user: User): Promise<User> {
    const prismaclient = await this.prismaClientAdapter.createInstance(tenantConfig);

    const newUser = await prismaclient.user.create({ data: user });

    await prismaclient.$disconnect();

    return newUser;
  }

  async update(tenantConfig: TenantConfig, user: User, id: number): Promise<User> {
    const prismaclient = await this.prismaClientAdapter.createInstance(tenantConfig);

    const newUser = await prismaclient.user.update({
      where: {
        id,
      },
      data: user,
    });

    await prismaclient.$disconnect();

    return newUser;
  }

  async delete(tenantConfig: TenantConfig, id: number): Promise<User> {
    const prismaclient = await this.prismaClientAdapter.createInstance(tenantConfig);
    const deleteUser = await prismaclient.user.delete({
      where: {
        id,
      },
    });
    await prismaclient.$disconnect();
    return deleteUser;
  }

  async findById(tenantConfig: TenantConfig, id: number): Promise<User | null> {
    const prismaclient = await this.prismaClientAdapter.createInstance(tenantConfig);

    const user = await prismaclient.user.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
      where: {
        id,
      },
    });

    await prismaclient.$disconnect();

    return user;
  }

  async findByEmail(tenantConfig: TenantConfig, email: string): Promise<User | null> {
    const prismaclient = await this.prismaClientAdapter.createInstance(tenantConfig);

    const user = await prismaclient.user.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
      where: {
        email,
      },
    });

    await prismaclient.$disconnect();

    return user;
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
