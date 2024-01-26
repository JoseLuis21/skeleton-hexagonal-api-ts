import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../../../domain/user.repository';
import { UserMysql } from '../../database/mysql/user.mysql';
import { CreateUser } from '../../../application/create';
import { UpdateUser } from '../../../application/update';
import { DeleteUser } from '../../../application/delete';
import { FindByIdUser } from '../../../application/find-by-id';
import { FindByEmailUser } from '../../../application/find-by-email';
import { FindAllUser } from '../../../application/find-all';
import { PrismaClientAdapter } from '../../../../../internal/database/prisma/PrismaClientAdapter';

export default async function UserRoutes(fastify: FastifyInstance) {
  const prismaClientAdapter: PrismaClientAdapter = new PrismaClientAdapter();
  const userMysql: UserRepository = new UserMysql(prismaClientAdapter);
  const createUser = new CreateUser(userMysql);
  const updateUser = new UpdateUser(userMysql);
  const deleteUser = new DeleteUser(userMysql);
  const findByIdUser = new FindByIdUser(userMysql);
  const findByEmailUser = new FindByEmailUser(userMysql);
  const findAllUser = new FindAllUser(userMysql);
  const userController = new UserController(
    createUser,
    updateUser,
    deleteUser,
    findByIdUser,
    findByEmailUser,
    findAllUser,
  );

  fastify.get('/', userController.getUsers.bind(userController));
  fastify.get('/:id', userController.getUserById.bind(userController));
}
