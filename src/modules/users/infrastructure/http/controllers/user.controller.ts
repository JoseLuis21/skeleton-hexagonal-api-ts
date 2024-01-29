import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CreateUser } from '../../../application/create';
import { UpdateUser } from '../../../application/update';
import { DeleteUser } from '../../../application/delete';
import { FindByIdUser } from '../../../application/find-by-id';
import { FindByEmailUser } from '../../../application/find-by-email';
import { FindAllUser } from '../../../application/find-all';
import { User } from '../../../domain/user.model';
import { Tenant } from '../../../../shared/domain/tenant.model';

export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
    private readonly findByIdUser: FindByIdUser,
    private readonly findByEmailUser: FindByEmailUser,
    private readonly findAllUser: FindAllUser,
  ) {}

  async getUsers(_: FastifyRequest, reply: FastifyReply) {
    const tenantConfig = new Tenant('prisma', 1, 'reader');
    const users = await this.findAllUser.execute(tenantConfig.getBaseInfoTentant());
    return reply.send(users).status(200);
  }

  async addUser(_: FastifyRequest, reply: FastifyReply) {
    const tenantConfig = new Tenant('prisma', 1, 'reader');
    const user = new User('jose', 'jose@jose.cl', '123456');
    return this.createUser.execute(tenantConfig.getBaseInfoTentant(), user);
  }
  async modifyUser(_: FastifyRequest, reply: FastifyReply) {
    const tenantConfig = new Tenant('prisma', 1, 'reader');
    const user = new User('jose', 'jose@jose.cl', '123456');
    return this.updateUser.execute(tenantConfig.getBaseInfoTentant(), user);
  }
  async removeUser(_: FastifyRequest, reply: FastifyReply) {
    const tenantConfig = new Tenant('prisma', 1, 'reader');
    return this.deleteUser.execute(tenantConfig.getBaseInfoTentant(), 1);
  }
  async getUserById(_: FastifyRequest, reply: FastifyReply) {
    try {
      const tenantConfig = new Tenant('prisma', 1, 'reader');
      const user = await this.findByIdUser.execute(tenantConfig.getBaseInfoTentant(), 1);
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
    const tenantConfig = new Tenant('prisma', 1, 'reader');
    return this.findByEmailUser.execute(tenantConfig.getBaseInfoTentant(), 'test@test.com');
  }
}
