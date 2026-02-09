import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { headers } from "next/headers";

import { auth } from "~/server/better-auth/config";

interface ChatRequest {
    messages: UIMessage[];
    noteId: string;
}

export async function POST(req: Request) {
    const { messages, noteId } = (await req.json()) as ChatRequest;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!noteId) {
        return new Response("Note ID is required", { status: 400 });
    }

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
        model: google("gemini-2.5-flash"),
        messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
}
