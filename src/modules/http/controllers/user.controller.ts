import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
  async getUser(_: FastifyRequest, reply: FastifyReply) {
    return reply.send({ hola: 'desde user' }).status(200);
  }
}
