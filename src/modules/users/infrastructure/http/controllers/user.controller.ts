import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { type CreateUser } from '../../../application/create';
import { type UpdateUser } from '../../../application/update';
import { type DeleteUser } from '../../../application/delete';
import { type FindByIdUser } from '../../../application/find.by.id';
import { type FindByEmailUser } from '../../../application/find.by.email';
import { type FindAllUser } from '../../../application/find.all';
import { User } from '../../../domain/user.model';
import { Tenant } from '../../../../shared/domain/tenant.model';
import { Encryption } from '../../../../../internal/encryption/encryption';
import { type RedisClientAdapter } from '../../../../../internal/cache/redis.client.adapter';
import { schemaUser, shemaGetUserByEmail, shemaUserById } from '../validations/user.zod';

export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
    private readonly findByIdUser: FindByIdUser,
    private readonly findByEmailUser: FindByEmailUser,
    private readonly findAllUser: FindAllUser,
    private readonly redisClientAdapter: RedisClientAdapter,
  ) {}

  async getUsers(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    await this.redisClientAdapter.set('test_key', 'test_value');
    const tenantConfig = new Tenant(request.user.tenantName, request.user.tenantNode, 'reader');
    const users = await this.findAllUser.execute(tenantConfig.getBaseInfoTentant(), 4, 3);
    return await reply.send(users).status(200);
  }

  async addUser(request: FastifyRequest, reply: FastifyReply): Promise<User & { token: string }> {
    const { name, email, password, tenantName, tenantNode } = schemaUser.parse(request.body);
    const tenantConfig = new Tenant(tenantName, tenantNode, 'writter');
    const passwordHashed = new Encryption().hash(password);
    const user = new User(name, email, passwordHashed);
    const token = await reply.jwtSign({ tenantName, tenantNode });
    const result = { ...user, token };
    await this.createUser.execute(tenantConfig.getBaseInfoTentant(), user);
    return result;
  }

  async modifyUser(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    try {
      const { id } = shemaUserById.parse(request.params);
      const { name, email, password, tenantName, tenantNode } = schemaUser.parse(request.body);
      const tenantConfig = new Tenant(tenantName, tenantNode, 'writter');
      const passwordHashed = new Encryption().hash(password);
      const user = new User(name, email, passwordHashed);
      return await this.updateUser.execute(tenantConfig.getBaseInfoTentant(), user, Number(id));
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

  async removeUser(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    try {
      const { id } = shemaUserById.parse(request.params);
      const tenantConfig = new Tenant(request.user.tenantName, request.user.tenantNode, 'writter');
      return await this.deleteUser.execute(tenantConfig.getBaseInfoTentant(), Number(id));
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

  async getUserById(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    try {
      const { id } = shemaUserById.parse(request.params);
      const tenantConfig = new Tenant(request.user.tenantName, request.user.tenantNode, 'reader');
      const user = await this.findByIdUser.execute(tenantConfig.getBaseInfoTentant(), Number(id));
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
    try {
      const { email } = shemaGetUserByEmail.parse(request.params);
      const tenantConfig = new Tenant(request.user.tenantName, request.user.tenantNode, 'reader');
      return await this.findByEmailUser.execute(tenantConfig.getBaseInfoTentant(), email);
    } catch (error) {
      console.log(error);
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
}
