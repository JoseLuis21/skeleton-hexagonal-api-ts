import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';

export default async function getUser(fastify: FastifyInstance) {
  const userController = new UserController();

  fastify.get('/', userController.getUser);
}
