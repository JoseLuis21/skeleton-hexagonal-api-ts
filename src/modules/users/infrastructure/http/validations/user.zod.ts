import { z } from 'zod';

export const shemaGetUserById = z.object({
  id: z.string().min(1),
});
