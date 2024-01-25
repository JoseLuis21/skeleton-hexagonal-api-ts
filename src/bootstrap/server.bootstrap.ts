import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IBootstrap } from './bootstap.interface';

export class ServerBootstrap implements IBootstrap {
  private readonly fastify: FastifyInstance;

  constructor() {
    this.fastify = Fastify({
      logger: true,
    });
    this.addtHealthCheck();
    this.addMiddlewares();
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

  private addtHealthCheck(): void {
    this.fastify.get('/healthcheck', (_: FastifyRequest, reply: FastifyReply) => {
      return reply.send('ok').status(200);
    });
  }

  private addRoutes(): void {
    this.fastify.register(import('../modules/http/routes/user.routes'), { prefix: 'test' });
  }
}
