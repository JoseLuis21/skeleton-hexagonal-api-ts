import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import { type FastifyInstanceCustom } from './fastify';

export class Server {
  private readonly fastify: FastifyInstanceCustom;
  private readonly port: number;
  private readonly secretJwt: string;

  constructor(port: number, secretJwt: string) {
    this.fastify = Fastify({
      logger: true,
    });
    this.port = port;
    this.secretJwt = secretJwt;
  }

  async initialize(): Promise<boolean | Error> {
    await this.addCors();
    this.addHealthCheck();
    await this.addPlugins();
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

  private async addPlugins(): Promise<void> {
    await this.fastify.register(import('@fastify/jwt'), {
      secret: this.secretJwt,
    });

    await this.fastify.register(import('../../../src/modules/shared/infrastructure/http/auth.plugin'), {});
  }
}
