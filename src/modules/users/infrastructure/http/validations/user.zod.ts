import { z } from 'zod';

export const shemaUserById = z.object({
  id: z
    .string()
    .min(1)
    .refine((value) => !isNaN(Number(value)), {
      message: 'This value is not Numeric',
    }),
});

export const shemaGetUserByEmail = z.object({
  email: z.string().min(1),
});

export const schemaUser = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
  tenantName: z.string().min(1),
  tenantNode: z.number().min(1),
});
