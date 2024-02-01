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
import { Encryption } from '../../../../../internal/encryption/encryption';

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
    const tenantConfig = new Tenant(request.user.tenantName, request.user.tenantNode, 'reader');
    const users = await this.findAllUser.execute(tenantConfig.getBaseInfoTentant(), 4, 3);
    return await reply.send(users).status(200);
  }

  async addUser(_: FastifyRequest, reply: FastifyReply): Promise<User & { token: string }> {
    const tenantConfig = new Tenant('prisma', 1, 'writter');

    const passwordHashed = new Encryption().hash('12345');

    const user = new User('jose', 'jose8@jose.cl', passwordHashed);

    const token = await reply.jwtSign({ tenantName: 'prisma', tenantNode: 1 });

    const result = { ...user, token };

    await this.createUser.execute(tenantConfig.getBaseInfoTentant(), user);

    return result;
  }

  async modifyUser(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    const tenantConfig = new Tenant(request.user.tenantName, request.user.tenantNode, 'reader');
    const passwordHashed = new Encryption().hash('12345');
    const user = new User('jose', 'jose@jose.cl', passwordHashed);
    return await this.updateUser.execute(tenantConfig.getBaseInfoTentant(), user, 1);
  }

  async removeUser(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    const tenantConfig = new Tenant(request.user.tenantName, request.user.tenantNode, 'reader');
    return await this.deleteUser.execute(tenantConfig.getBaseInfoTentant(), 1);
  }

  async getUserById(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    try {
      const tenantConfig = new Tenant(request.user.tenantName, request.user.tenantNode, 'reader');
      const user = await this.findByIdUser.execute(tenantConfig.getBaseInfoTentant(), 2);
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

  async getUserByEmail(request: FastifyRequest, reply: FastifyReply): Promise<User | null> {
    const tenantConfig = new Tenant(request.user.tenantName, request.user.tenantNode, 'reader');
    return await this.findByEmailUser.execute(tenantConfig.getBaseInfoTentant(), 'email@email5.cl');
  }
}
