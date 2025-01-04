import { z } from 'zod';

export const coAuthorSchema = z.object({
      content: z.string().describe('The rewritten content')
});

export type CoAuthorResponse = z.infer<typeof coAuthorSchema>; 