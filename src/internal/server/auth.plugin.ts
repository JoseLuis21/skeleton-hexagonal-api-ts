import { type FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { type FastifyReply } from 'fastify/types/reply';
import { type FastifyRequest } from 'fastify/types/request';

export default fastifyPlugin(async function (fastify: FastifyInstance, _) {
  fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      await reply.send(err);
    }
  });
});
