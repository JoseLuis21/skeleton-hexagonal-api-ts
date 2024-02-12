import { type User } from '@modules/users/domain/user.model';
import { type UserRepository } from '@modules/users/domain/user.repository';
import { type PrismaClientAdapter } from '@internal/database/prisma.client.adapter';
import { type TenantConfig } from '@modules/shared/domain/tenant.types';
import type IResult from '@modules/shared/application/result.interface';
import { ResponseDto } from '@modules/users/domain/dtos/response.dto';
import { TraceLibrary } from '@modules/shared/infrastructure/trace.library';

export class UserMysqlRepository implements UserRepository {
  constructor(private readonly prismaClientAdapter: PrismaClientAdapter) {}

  async create(tenantConfig: TenantConfig, user: User): Promise<IResult<User>> {
    const prismaclient = await this.prismaClientAdapter.createInstance(tenantConfig);

    const newUser = await prismaclient.user.create({ data: user });

    await prismaclient.$disconnect();

    return ResponseDto(TraceLibrary.getTraceId(), newUser);
  }

  async update(tenantConfig: TenantConfig, user: User, id: number): Promise<IResult<User>> {
    const prismaclient = await this.prismaClientAdapter.createInstance(tenantConfig);

    const newUser = await prismaclient.user.update({
      where: {
        id,
      },
      data: user,
    });

    await prismaclient.$disconnect();

    return ResponseDto(TraceLibrary.getTraceId(), newUser);
  }

  async delete(tenantConfig: TenantConfig, id: number): Promise<IResult<User>> {
    const prismaclient = await this.prismaClientAdapter.createInstance(tenantConfig);
    const deleteUser = await prismaclient.user.delete({
      where: {
        id,
      },
    });
    await prismaclient.$disconnect();
    return ResponseDto(TraceLibrary.getTraceId(), deleteUser);
  }

  async findById(tenantConfig: TenantConfig, id: number): Promise<IResult<User | null>> {
    const prismaclient = await this.prismaClientAdapter.createInstance(tenantConfig);

    const user = await prismaclient.user.findFirst({
      select: {
        name: true,
        email: true,
        password: true,
      },
      where: {
        id,
      },
    });

    await prismaclient.$disconnect();

    if (user == null) {
      return ResponseDto(TraceLibrary.getTraceId(), null);
    }

    return ResponseDto(TraceLibrary.getTraceId(), user);
  }

  async findByEmail(tenantConfig: TenantConfig, email: string): Promise<IResult<User | null>> {
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

    if (user == null) {
      return ResponseDto(TraceLibrary.getTraceId(), null);
    }

    return ResponseDto(TraceLibrary.getTraceId(), user);
  }

  async findAll(tenantConfig: TenantConfig, cursor: number, pageLimit: number): Promise<IResult<User>> {
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

    return ResponseDto(TraceLibrary.getTraceId(), users, 0);
  }
}
