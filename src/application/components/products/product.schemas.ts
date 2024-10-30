import { paginationSchema } from '@/application/shared/schemas';
import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  price: z.number().positive(),
  stock: z.number().int().positive(),
  category: z.string().uuid(),
  images: z.array(z.string().url()).nonempty(),
});
export const getProductsSchema = z.object({
  query: paginationSchema.extend({
    category: z.string().uuid().optional(),
    search: z.string().optional(),
  }),
});
export const getProductBySlugSchema = z.object({
  slug: z.string(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type GetProductsSchema = z.infer<typeof getProductsSchema>;
export type GetProductBySlugSchema = z.infer<typeof getProductBySlugSchema>;
