import { UserController } from '../controllers/user.controller';
import { type UserRepository } from '../../../domain/user.repository';
import { UserMysqlRepository } from '../../database/user.mysql.repository';
import { CreateUser } from '../../../application/create';
import { UpdateUser } from '../../../application/update';
import { DeleteUser } from '../../../application/delete';
import { FindByIdUser } from '../../../application/find-by-id';
import { FindByEmailUser } from '../../../application/find-by-email';
import { FindAllUser } from '../../../application/find-all';
import { PrismaClientAdapter } from '../../../../../internal/database/prisma/PrismaClientAdapter';
import { type FastifyInstanceCustom } from '../../../../../internal/server/fastify';

export default async function UserRoutes(fastify: FastifyInstanceCustom): Promise<void> {
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
  );

  fastify.get(
    '/',
    {
      onRequest: [fastify.authenticate],
    },
    userController.getUsers.bind(userController),
  );

  fastify.get('/one', userController.getUserById.bind(userController));
  fastify.get('/email', userController.getUserByEmail.bind(userController));
  fastify.post('/', userController.addUser.bind(userController));
  fastify.put('/', userController.modifyUser.bind(userController));
  fastify.delete('/', userController.removeUser.bind(userController));
}
