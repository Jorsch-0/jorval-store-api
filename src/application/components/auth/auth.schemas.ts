import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email().toLowerCase(),
  name: z.string().min(3).max(255),
  password: z.string().min(6).max(60),
});
export type SignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6).max(60),
});
export type LoginSchema = z.infer<typeof loginSchema>;
