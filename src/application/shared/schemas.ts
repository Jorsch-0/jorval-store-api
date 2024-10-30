import { z } from 'zod';

export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => parseInt(v || '1'))
    .superRefine((val, ctx) => {
      if (isNaN(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Page must be a number',
        });
      }

      if (val <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Page must be greater than 0',
        });
      }
    }),
  limit: z
    .string()
    .optional()
    .transform((v) => parseInt(v || '10'))
    .superRefine((val, ctx) => {
      if (isNaN(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Limit must be a number',
        });
      }

      if (val <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Limit must be greater than 0',
        });
      }
    }),
});
