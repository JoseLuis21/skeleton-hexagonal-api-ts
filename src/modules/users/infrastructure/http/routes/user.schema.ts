import { type FastifySchema } from 'fastify';

export const getUsersSchema: FastifySchema = {
  description: 'Get all users',
  tags: ['Users'],
  summary: 'Get All Users',
  headers: {
    AuthorizationBearerRequired: {},
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      properties: {
        name: { type: 'string', description: 'Name user' },
        email: { type: 'string', description: 'Email user' },
        password: { type: 'string', description: 'Password user' },
        tenantName: { type: 'string', description: 'Database Name' },
        tenantNode: { type: 'number', description: 'Host Number' },
      },
    },
  },
  security: [
    {
      apiKey: ['Authorization'],
    },
  ],
};

export const getUserSchema: FastifySchema = {
  description: 'Get user',
  tags: ['Users'],
  summary: 'Get User',
  headers: {
    AuthorizationBearerRequired: {},
  },
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id User',
      },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name user' },
        email: { type: 'string', description: 'Email user' },
        password: { type: 'string', description: 'Password user' },
        tenantName: { type: 'string', description: 'Database Name' },
        tenantNode: { type: 'number', description: 'Host Number' },
      },
    },
  },
  security: [
    {
      apiKey: ['Authorization'],
    },
  ],
};

export const getUserByEmailSchema: FastifySchema = {
  description: 'Get user by email',
  tags: ['Users'],
  summary: 'Get User by email',
  headers: {
    AuthorizationBearerRequired: {},
  },
  params: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'Email user',
      },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name user' },
        email: { type: 'string', description: 'Email user' },
        password: { type: 'string', description: 'Password user' },
        tenantName: { type: 'string', description: 'Database Name' },
        tenantNode: { type: 'number', description: 'Host Number' },
      },
    },
  },
  security: [
    {
      apiKey: ['Authorization'],
    },
  ],
};

export const createUserSchema: FastifySchema = {
  description: 'Create user',
  tags: ['Users'],
  summary: 'Create User',
  body: {
    type: 'object',
    required: ['name', 'email', 'password', 'tenantName', 'tenantNode'],
    properties: {
      name: { type: 'string', description: 'Name user' },
      email: { type: 'string', description: 'Email user' },
      password: { type: 'string', description: 'Password user' },
      tenantName: { type: 'string', description: 'Database Name' },
      tenantNode: { type: 'number', description: 'Host Number' },
    },
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name user' },
        email: { type: 'string', description: 'Email user' },
        password: { type: 'string', description: 'Password user' },
        tenantName: { type: 'string', description: 'Database Name' },
        tenantNode: { type: 'number', description: 'Host Number' },
      },
    },
  },
  security: [
    {
      apiKey: ['Authorization'],
    },
  ],
};

export const modifyUserSchema: FastifySchema = {
  description: 'Modify user',
  tags: ['Users'],
  summary: 'Modify User',
  headers: {
    AuthorizationBearerRequired: {},
  },
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id User',
      },
    },
  },
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string', description: 'Name user' },
      email: { type: 'string', description: 'Email user' },
      password: { type: 'string', description: 'Password user' },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Id user' },
        name: { type: 'string', description: 'Name user' },
        email: { type: 'string', description: 'Email user' },
        password: { type: 'string', description: 'Password user' },
        tenantName: { type: 'string', description: 'Database Name' },
        tenantNode: { type: 'number', description: 'Host Number' },
      },
    },
  },
  security: [
    {
      apiKey: ['Authorization'],
    },
  ],
};

export const deleteUserSchema: FastifySchema = {
  description: 'Delete user',
  tags: ['Users'],
  summary: 'Delete User',
  headers: {
    AuthorizationBearerRequired: {},
  },
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id User',
      },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name user' },
        email: { type: 'string', description: 'Email user' },
        password: { type: 'string', description: 'Password user' },
        tenantName: { type: 'string', description: 'Database Name' },
        tenantNode: { type: 'number', description: 'Host Number' },
      },
    },
  },
  security: [
    {
      apiKey: ['Authorization'],
    },
  ],
};
