import type { ListItem } from "../../types.ts";
import { FreshContext } from "$fresh/server.ts";
import { z } from "npm:zod";

const reqSchema: z.Schema<{ items: ListItem[] }> = z.object({
  items: z.array(z.object({
    id: z.number(),
    title: z.string(),
    maxAmount: z.number(),
    amount: z.number(),
  })),
});

const handler = async (req: Request, _ctx: FreshContext): Promise<Response> => {
  const BAD_REQUEST = new Response(null, { status: 400 });
  if (req.method !== "POST") {
    return BAD_REQUEST;
  }

  if (req.headers.get("Content-Type") !== "application/json") {
    return BAD_REQUEST;
  }

  try {
    const file = await req.json();
    const valid = reqSchema.parse(file);
    console.log(valid);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed: ", error.issues[0]);
      return new Response("bad request", { status: 400 });
    } else {
      return BAD_REQUEST;
    }
  }

  return new Response("hello world!");
};

export { handler };
