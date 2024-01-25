import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../../../domain/user.repository';
import { UserInfrastructure } from '../../user.infrastructure';
import { CreateUser } from '../../../application/create';
import { UpdateUser } from '../../../application/update';
import { DeleteUser } from '../../../application/delete';
import { FindByIdUser } from '../../../application/find-by-id';
import { FindByEmailUser } from '../../../application/find-by-email';
import { FindAllUser } from '../../../application/find-all';

export default async function getUser(fastify: FastifyInstance) {
  const useInfrsatructure: UserRepository = new UserInfrastructure();
  const createUser = new CreateUser(useInfrsatructure);
  const updateUser = new UpdateUser(useInfrsatructure);
  const deleteUser = new DeleteUser(useInfrsatructure);
  const findByIdUser = new FindByIdUser(useInfrsatructure);
  const findByEmailUser = new FindByEmailUser(useInfrsatructure);
  const findAllUser = new FindAllUser(useInfrsatructure);
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
