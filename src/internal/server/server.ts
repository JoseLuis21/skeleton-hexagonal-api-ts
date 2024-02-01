import Fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import cors from '@fastify/cors';

export class Server {
  private readonly fastify: FastifyInstance;
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
    await this.addPluginJwtAuth();
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

  private async addPluginJwtAuth(): Promise<void> {
    const myCustomMessages = {
      badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
      badCookieRequestErrorMessage: 'Cookie could not be parsed in request',
      noAuthorizationInHeaderMessage: 'No Authorization was found in request.headers',
      noAuthorizationInCookieMessage: 'No Authorization was found in request.cookies',
      authorizationTokenExpiredMessage: 'Authorization token expired',
      authorizationTokenUntrusted: 'Untrusted authorization token',
      authorizationTokenUnsigned: 'Unsigned authorization token',
      // for the below message you can pass a sync function that must return a string as shown or a string
      authorizationTokenInvalid: (err: Error) => {
        return `Authorization token is invalid: ${err.message}`;
      },
    };
    await this.fastify.register(import('@fastify/jwt'), {
      secret: this.secretJwt,
      messages: myCustomMessages,
    });

    await this.fastify.register(import('./auth.plugin'), {});
  }
}
