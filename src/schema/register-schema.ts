import { z } from 'zod';

export const registerFormSchema = z.object({
  login: z.string().min(3).max(25),
  password: z.string().min(8),
  repeatPassword: z.string().min(8),
});
