/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { UserController } from '@modules/users/infrastructure/http/controllers/user.controller';
import { type UserRepository } from '@modules/users/domain/user.repository';
import { UserMysqlRepository } from '@modules/users/infrastructure/database/user.mysql.repository';
import { CreateUser } from '@modules/users/application/create';
import { UpdateUser } from '@modules/users/application/update';
import { DeleteUser } from '@modules/users/application/delete';
import { FindByIdUser } from '@modules/users/application/find.by.id';
import { FindByEmailUser } from '@modules/users/application/find.by.email';
import { FindAllUser } from '@modules/users/application/find.all';
import { PrismaClientAdapter } from '@internal/database/prisma.client.adapter';
import { type FastifyInstance } from 'fastify';
import { RedisClientAdapter } from '@internal/cache/redis.client.adapter';
import {
  createUserSchema,
  deleteUserSchema,
  getUserByEmailSchema,
  getUserSchema,
  getUsersSchema,
  modifyUserSchema,
} from './user.schema';

export default async function UserRoutes(fastify: FastifyInstance): Promise<void> {
  const redisClientAdapter = new RedisClientAdapter();
  const prismaClientAdapter: PrismaClientAdapter = new PrismaClientAdapter();
  const userMysqlRepository: UserRepository = new UserMysqlRepository(prismaClientAdapter);
  const createUser = new CreateUser(userMysqlRepository);
  const updateUser = new UpdateUser(userMysqlRepository);
  const deleteUser = new DeleteUser(userMysqlRepository);
  const findByIdUser = new FindByIdUser(userMysqlRepository);
  const findByEmailUser = new FindByEmailUser(userMysqlRepository);
  const findAllUser = new FindAllUser(userMysqlRepository);
  const userController = new UserController(
    createUser,
    updateUser,
    deleteUser,
    findByIdUser,
    findByEmailUser,
    findAllUser,
    redisClientAdapter,
  );

  fastify.get(
    '/',
    {
      schema: getUsersSchema,
      onRequest: [fastify.authenticate],
    },
    userController.getUsers.bind(userController),
  );

  fastify.get(
    '/:id',
    {
      schema: getUserSchema,
      onRequest: [fastify.authenticate],
    },
    userController.getUserById.bind(userController),
  );
  fastify.get(
    '/by-email/:email',
    {
      schema: getUserByEmailSchema,
      onRequest: [fastify.authenticate],
    },
    userController.getUserByEmail.bind(userController),
  );
  fastify.post(
    '/',
    {
      schema: createUserSchema,
    },
    userController.addUser.bind(userController),
  );
  fastify.put(
    '/:id',
    {
      schema: modifyUserSchema,
      onRequest: [fastify.authenticate],
    },
    userController.modifyUser.bind(userController),
  );
  fastify.delete(
    '/:id',
    {
      schema: deleteUserSchema,
      onRequest: [fastify.authenticate],
    },
    userController.removeUser.bind(userController),
  );
}
