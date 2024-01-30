import Fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import cors from '@fastify/cors';

export class Server {
  private readonly fastify: FastifyInstance;
  private readonly port: number;

  constructor(port: number) {
    this.fastify = Fastify({
      logger: true,
    });
    this.port = port;
  }

  async initialize(): Promise<boolean | Error> {
    await this.addCors();
    this.addHealthCheck();
    await this.addRoutes();

    try {
      await this.fastify.listen({ port: this.port });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      } else {
        console.error(error);
        return new Error('Internal Error');
      }
    }
  }

  private addHealthCheck(): void {
    this.fastify.get('/healthcheck', (_: FastifyRequest, reply: FastifyReply) => reply.send('ok').status(200));
  }

  private async addRoutes(): Promise<void> {
    await this.fastify.register(import('../../modules/users/infrastructure/http/routes/user.routes'), {
      prefix: 'v1/users',
    });
  }

  private async addCors(): Promise<void> {
    await this.fastify.register(cors, {});
  }
}
