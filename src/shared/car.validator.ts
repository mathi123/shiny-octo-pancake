import * as z from 'zod';

export const carSchema = z.object({
  id: z.uuid().nullable(),
  name: z.string().min(1).max(100),
});
