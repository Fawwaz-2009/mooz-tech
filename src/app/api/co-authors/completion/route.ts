import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { coAuthorSchema } from "../schema";

// Set runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamObject({
    model: openai("gpt-3.5-turbo"),
    schema: coAuthorSchema,
    system: `You are a skilled writing assistant that can rewrite text in multiple ways.`,
    prompt: `Please rewrite and improve the following text:\n\n${prompt}`,
  });

  return result.toTextStreamResponse();
}
