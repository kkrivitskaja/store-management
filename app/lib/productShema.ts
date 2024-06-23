import { z } from 'zod';
export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .regex(/^[\d\sA-Z\\a-z-]+$/, {
      message: 'Only latin letters, digits, spaces, and dashes are allowed',
    }),
});
