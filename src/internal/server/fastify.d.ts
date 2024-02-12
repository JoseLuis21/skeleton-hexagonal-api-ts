export declare module 'fastify' {
  interface FastifyInstance {
    authenticate?: any;
  }

  export interface FastifyRequest {
    demo_string?: string;
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
