import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { type CreateUser } from '../../../application/create';
import { type UpdateUser } from '../../../application/update';
import { type DeleteUser } from '../../../application/delete';
import { type FindByIdUser } from '../../../application/find-by-id';
import { type FindByEmailUser } from '../../../application/find-by-email';
import { type FindAllUser } from '../../../application/find-all';
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

  async getUsers(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    const tenantConfig = new Tenant('prisma', 1, 'reader');
    console.log(request.user);
    const users = await this.findAllUser.execute(tenantConfig.getBaseInfoTentant(), 4, 3);
    return await reply.send(users).status(200);
  }

  async addUser(_: FastifyRequest, reply: FastifyReply): Promise<User> {
    const tenantConfig = new Tenant('prisma', 1, 'reader');
    const user = new User('jose', 'jose@jose.cl', '123456');

    const token = await reply.jwtSign({ test: '1' });

    console.log(token);

    return await this.createUser.execute(tenantConfig.getBaseInfoTentant(), user);
  }

  async modifyUser(_: FastifyRequest, reply: FastifyReply): Promise<User> {
    const tenantConfig = new Tenant('prisma', 1, 'reader');
    const user = new User('jose', 'jose@jose.cl', '123456');
    return await this.updateUser.execute(tenantConfig.getBaseInfoTentant(), user);
  }

  async removeUser(_: FastifyRequest, reply: FastifyReply): Promise<boolean> {
    const tenantConfig = new Tenant('prisma', 1, 'reader');
    return await this.deleteUser.execute(tenantConfig.getBaseInfoTentant(), 1);
  }

  async getUserById(_: FastifyRequest, reply: FastifyReply): Promise<User> {
    try {
      const tenantConfig = new Tenant('prisma', 1, 'reader');
      const user = await this.findByIdUser.execute(tenantConfig.getBaseInfoTentant(), 1);
      return await reply.send(user).status(200);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return await reply.status(400).send({ errors: validationErrors });
      }
      return await reply.status(500).send({ error: 'Something went wrong' });
    }
  }

  async getUserByEmail(_: FastifyRequest, reply: FastifyReply): Promise<User> {
    const tenantConfig = new Tenant('prisma', 1, 'reader');
    return await this.findByEmailUser.execute(tenantConfig.getBaseInfoTentant(), 'test@test.com');
  }
}
