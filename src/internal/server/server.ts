import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';

export class Server {
  private readonly fastify: FastifyInstance;

  constructor() {
    this.fastify = Fastify({
      logger: true,
    });
    this.addMiddlewares();
    this.addCors();
    this.addHealthCheck();
    this.addRoutes();
  }

  async initialize(): Promise<Boolean | Error> {
    return new Promise(async (resolve, reject) => {
      this.fastify.listen({ port: 8084 }, (err, _) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }

  private addMiddlewares() {}

  private addHealthCheck(): void {
    this.fastify.get('/healthcheck', (_: FastifyRequest, reply: FastifyReply) => {
      return reply.send('ok').status(200);
    });
  }

  private addRoutes(): void {
    this.fastify.register(import('../../modules/users/infrastructure/http/routes/user.routes'), { prefix: 'v1/users' });
  }

  private addCors(): void {
    this.fastify.register(cors, {});
  }
}
