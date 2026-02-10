"use client";

import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { Markdown } from "~/components/markdown";
import { useTextareaAutosize } from "~/hooks/use-textarea-autosize";

import { api } from "~/trpc/react";

interface ChatInterfaceProps {
    noteId: string;
    textContent?: string;
    initialMessage?: string;
    onMessageSent?: () => void;
}

export function ChatInterface({
    noteId,
    textContent,
    initialMessage,
    onMessageSent,
}: ChatInterfaceProps) {
    const { data: history } = api.message.listByNoteId.useQuery({ noteId });
    const utils = api.useUtils();

    const transport = useMemo(
        () =>
            new DefaultChatTransport({
                api: "/api/chat",
                body: { noteId, textContent },
            }),
        [noteId, textContent]
    );

    const { messages, status, sendMessage, setMessages } = useChat({
        transport,
    });

    const [input, setInput] = useState("");
    const isLoading = status === "streaming" || status === "submitted";
    const { textareaRef, adjustHeight, resetHeight } =
        useTextareaAutosize(input);

    // Refs for scrolling
    const scrollRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load initial history
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

    // Handle initial message (e.g. from "Explain" button)
    const processedMessageRef = useRef<string | null>(null);

    useEffect(() => {
        if (
            initialMessage &&
            !isLoading &&
            processedMessageRef.current !== initialMessage
        ) {
            processedMessageRef.current = initialMessage;
            void (async () => {
                try {
                    // Send message immediately
                    await sendMessage({
                        parts: [
                            {
                                type: "text",
                                text: `Explain this: "${initialMessage}"`,
                            },
                        ],
                    });

                    // Notify parent that message was sent (to clear pending state)
                    onMessageSent?.();

                    // Refresh stats after sending
                    await utils.stats.getMyStats.invalidate();
                } catch (error) {
                    console.error("Error sending initial message:", error);
                }
            })();
        }
    }, [initialMessage, isLoading, sendMessage, onMessageSent, utils]);

    // Scroll Logic
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Auto-scroll when new messages appear
    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        adjustHeight();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void handleSubmit(e);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        try {
            await sendMessage({
                parts: [{ type: "text", text: input }],
            });
            setInput("");
            resetHeight();
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
        <div className="bg-background relative flex h-full w-full flex-col overflow-hidden border">
            {/* Top Gradient for smooth fading */}
            <div className="from-background pointer-events-none absolute top-0 right-0 left-0 z-10 h-12 bg-linear-to-b to-transparent" />

            {/* Messages Area */}
            <div
                className="flex-1 space-y-6 overflow-y-auto scroll-smooth p-4"
                ref={scrollRef}
            >
                {/* Empty State */}
                {messages.length === 0 && (
                    <div className="text-muted-foreground flex h-full flex-col items-center justify-center opacity-50">
                        <p>Start a conversation about this note...</p>
                    </div>
                )}

                {/* Message List */}
                <AnimatePresence initial={false}>
                    {messages.map((m) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={cn(
                                "flex w-full gap-3",
                                m.role === "user"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                            )}
                        >
                            {/* Message Bubble */}
                            <div
                                className={cn(
                                    "relative max-w-[85%] px-5 py-3 text-sm",
                                    m.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-2xl shadow-sm"
                                        : "text-foreground ml-1 rounded-2xl rounded-tl-sm px-0 py-0"
                                )}
                            >
                                <Markdown>{getMessageText(m.parts)}</Markdown>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Loading Indicator */}
                {isLoading &&
                    messages[messages.length - 1]?.role === "user" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex w-full gap-3"
                        >
                            <div className="flex h-8 items-center gap-1 px-2">
                                {/* 3 Dot Wave Animation */}
                                <motion.div
                                    className="bg-foreground/50 h-1.5 w-1.5 rounded-full"
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        delay: 0,
                                    }}
                                />
                                <motion.div
                                    className="bg-foreground/50 h-1.5 w-1.5 rounded-full"
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        delay: 0.2,
                                    }}
                                />
                                <motion.div
                                    className="bg-foreground/50 h-1.5 w-1.5 rounded-full"
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        delay: 0.4,
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}

                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Input Area */}
            <div className="bg-background/80 z-20 border-t p-4 backdrop-blur-lg">
                <div className="bg-background focus-within:ring-ring relative flex items-end gap-2 rounded-xl border p-2 shadow-sm transition-all focus-within:ring-1">
                    <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your question..."
                        className="min-h-11 w-full resize-none border-0 bg-transparent p-3 text-base shadow-none focus-visible:ring-0 md:text-sm"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !input.trim()}
                        onClick={handleSubmit}
                        className={cn(
                            "mb-1 shrink-0 rounded-lg transition-all",
                            !input.trim() || isLoading
                                ? "opacity-50"
                                : "opacity-100"
                        )}
                    >
                        <ArrowUp className="size-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
                <div className="text-muted-foreground mt-2 text-center text-[10px] opacity-70">
                    AI can make mistakes. Verify important information.
                </div>
            </div>
        </div>
    );
}
