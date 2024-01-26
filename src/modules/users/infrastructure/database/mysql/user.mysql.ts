import { User } from '../../../domain/user.model';
import { UserRepository } from '../../../domain/user.repository';
import { PrismaClientAdapter } from '../../../../../internal/database/prisma/PrismaClientAdapter';
import { BaseInfoTenant } from '../../../../shared/domain/tenant-types';

export class UserMysql implements UserRepository {
  constructor(private readonly prismaClientAdapter: PrismaClientAdapter) {}

  create(baseInfoTenant: BaseInfoTenant, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(baseInfoTenant: BaseInfoTenant, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(baseInfoTenant: BaseInfoTenant, id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findById(baseInfoTenant: BaseInfoTenant, id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(baseInfoTenant: BaseInfoTenant, email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async findAll(baseInfoTenant: BaseInfoTenant): Promise<User[]> {
    const prismaclient = await this.prismaClientAdapter.createInstance(
      baseInfoTenant.tenantName,
      baseInfoTenant.tenantNode,
      baseInfoTenant.tenantType,
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
