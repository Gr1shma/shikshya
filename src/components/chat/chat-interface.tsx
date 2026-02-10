"use client";

import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { Send, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { Markdown } from "~/components/markdown";

import { api } from "~/trpc/react";

interface ChatInterfaceProps {
    noteId: string;
}

export function ChatInterface({ noteId }: ChatInterfaceProps) {
    const { data: history } = api.message.listByNoteId.useQuery({ noteId });
    const utils = api.useUtils();

    const transport = useMemo(
        () =>
            new DefaultChatTransport({
                api: "/api/chat",
                body: { noteId },
            }),
        [noteId]
    );

    const { messages, status, sendMessage, setMessages } = useChat({
        transport,
    });

    const [input, setInput] = useState("");
    const isLoading = status === "streaming" || status === "submitted";

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (history && messages.length === 0) {
            setMessages(
                history.map((m) => ({
                    id: m.id,
                    role: m.role as "user" | "assistant" | "system",
                    content: m.content,
                    parts: [{ type: "text", text: m.content }],
                }))
            );
        }
    }, [history, setMessages, messages.length]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        console.log("Sending message:", input);
        try {
            await sendMessage({
                parts: [{ type: "text", text: input }],
            });
            setInput("");
            await utils.stats.getMyStats.invalidate();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const getMessageText = (
        parts: Array<{ type: string; text?: string }>
    ): string => {
        return parts
            .filter((p) => p.type === "text" && p.text)
            .map((p) => p.text)
            .join("");
    };

    return (
        <div className="bg-background flex h-[600px] flex-col overflow-hidden rounded-lg border">
            <div className="text-muted-foreground p-2 text-xs">
                Status: {status}
            </div>
            <div
                className="flex-1 space-y-4 overflow-y-auto p-4"
                ref={scrollRef}
            >
                {messages.length === 0 && (
                    <div className="text-muted-foreground flex h-full items-center justify-center">
                        Ask a question about this note...
                    </div>
                )}
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={cn(
                            "flex w-full",
                            m.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                                m.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            <Markdown>{getMessageText(m.parts)}</Markdown>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-background border-t p-4">
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full items-center space-x-2"
                >
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type your question..."
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                        {isLoading ? (
                            <div className="animate-spin">
                                <Loader2 className="h-4 w-4" />
                            </div>
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    );
}
