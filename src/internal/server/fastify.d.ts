export declare module 'fastify' {
  interface FastifyInstance {
    authenticate?: any;
  }
}

interface UserPayload {
  tenantName: string;
  tenantNode: number;
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload;
  }
}
