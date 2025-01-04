import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Set runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that rewrites and improves text while maintaining the original meaning and intent. Focus on clarity, professionalism, and effectiveness.'
      },
      {
        role: 'user',
        content: `Please rewrite and improve the following text:\n\n${prompt}`
      }
    ],
  });

  return result.toDataStreamResponse();
} 