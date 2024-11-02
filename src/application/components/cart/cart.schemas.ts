import { z } from 'zod';

export const addOrRemoveProductToCartSchema = z.object({
  quantity: z.number().int().positive(),
  productSlug: z.string(),
});
export type AddProductToCartSchema = z.infer<typeof addOrRemoveProductToCartSchema>;
