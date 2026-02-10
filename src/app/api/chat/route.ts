import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { headers } from "next/headers";

import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

interface ChatRequest {
    messages: UIMessage[];
    noteId: string;
}

export async function POST(req: Request) {
    const { messages, noteId } = (await req.json()) as ChatRequest;

    const context = await createTRPCContext({
        headers: await headers(),
    });

    if (!context.session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const caller = createCaller(context);

    if (!noteId) {
        return new Response("Note ID is required", { status: 400 });
    }

    const note = await caller.note.getById({ id: noteId });

    if (!note) {
        return new Response("Note not found", { status: 404 });
    }

    // Save user message + award points for meaningful chat
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "user") {
        const lastMessageContent = lastMessage.parts
            .filter((p) => p.type === "text")
            .map((p) => p.text)
            .join("");

        await caller.chat.onStudentMessage({
            noteId,
            content: lastMessageContent,
        });

        await caller.activity.ping({
            noteId,
            eventType: "chat",
        });
    }

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
        model: google("gemini-2.5-flash"),
        system: `You are an expert, empathetic, and encouraging AI tutor. 
Your goal is to help the student deeply understand the provided note content.

### INSTRUCTIONS:
1. **Use the Note Context:** Answer questions primarily based on the provided text content. If the answer is in the text, use it to support your explanation.
2. **Be a Tutor, Not just a Summarizer:** Instead of just giving direct answers, explain the "why" and "how". If appropriate, ask follow-up questions to check the student's understanding.
3. **Handle Missing Information:** If a student asks something not covered in the note, politely state that the information is not in the current material, and offer to provide general knowledge on the topic instead.
4. **Formatting:** Use Markdown to make your answers readable (bullet points, bold text for key terms, etc.). Keep explanations concise but thorough.

### NOTE CONTENT:
${note.textContent ?? "No text content available."}
`,
        messages: modelMessages,
        onFinish: async (event) => {
            if (context.session?.user.id) {
                await caller.message.create({
                    id: crypto.randomUUID(),
                    role: "assistant", // "assistant" is valid in messageRoleEnum
                    content: event.text,
                    noteId: noteId,
                    userId: context.session.user.id,
                });
            }
        },
    });

    return result.toUIMessageStreamResponse();
}
