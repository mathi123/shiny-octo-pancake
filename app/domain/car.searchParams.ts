import z from 'zod';

export const carSearchParamsSchema = z
  .object({
    query: z.string().optional(),
  })
  .strict();

export type CarSearchParams = z.infer<typeof carSearchParamsSchema>;
