import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CreateUser } from '../../../application/create';
import { UpdateUser } from '../../../application/update';
import { DeleteUser } from '../../../application/delete';
import { FindByIdUser } from '../../../application/find-by-id';
import { FindByEmailUser } from '../../../application/find-by-email';
import { FindAllUser } from '../../../application/find-all';
import { User } from '../../../domain/user.model';
import { BaseInfoTenant, TenantType } from '../../../../shared/domain/base-info-tenant';

export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
    private readonly findByIdUser: FindByIdUser,
    private readonly findByEmailUser: FindByEmailUser,
    private readonly findAllUser: FindAllUser,
  ) {}

  async getUsers(req: FastifyRequest, reply: FastifyReply) {
    const baseInfoTenant: BaseInfoTenant = {
      tenantName: 'prisma',
      tenantNode: 1,
      tenantType: TenantType.READ,
    };
    const users = await this.findAllUser.execute(baseInfoTenant);
    return reply.send(users).status(200);
  }

  async addUser(_: FastifyRequest, reply: FastifyReply) {
    const user = new User('jose', 'jose@jose.cl', '123456');
    return this.createUser.execute(user);
  }
  async modifyUser(_: FastifyRequest, reply: FastifyReply) {
    const user = new User('jose', 'jose@jose.cl', '123456');
    return this.updateUser.execute(user);
  }
  async removeUser(_: FastifyRequest, reply: FastifyReply) {
    return this.deleteUser.execute(1);
  }
  async getUserById(_: FastifyRequest, reply: FastifyReply) {
    try {
      const user = await this.findByIdUser.execute(1);
      return reply.send(user).status(200);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return reply.status(400).send({ errors: validationErrors });
      } else {
        return reply.status(500).send({ error: 'Something went wrong' });
      }
    }
  }
  async getUserByEmail(_: FastifyRequest, reply: FastifyReply) {
    return this.findByEmailUser.execute('test@test.com');
  }
}
