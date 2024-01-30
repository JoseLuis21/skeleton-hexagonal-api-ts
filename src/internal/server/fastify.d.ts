import { type FastifyInstance } from 'fastify';

export interface FastifyInstanceCustom extends FastifyInstance {
  authenticate?: any;
}
