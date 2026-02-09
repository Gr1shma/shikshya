"use client";

import { useState } from "react";
import { ChatInterface } from "~/components/chat/chat-interface";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function ChatPage() {
    const [noteId, setNoteId] = useState("");
    const [inputNoteId, setInputNoteId] = useState("");
    const [isChatActive, setIsChatActive] = useState(false);

    const handleStartChat = () => {
        if (inputNoteId.trim()) {
            setNoteId(inputNoteId.trim());
            setIsChatActive(true);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl p-4">
            {!isChatActive ? (
                <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold">
                        Enter Note ID to Chat
                    </h1>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input
                            type="text"
                            placeholder="Enter Note UUID"
                            value={inputNoteId}
                            onChange={(e) => setInputNoteId(e.target.value)}
                        />
                        <Button
                            onClick={handleStartChat}
                            disabled={!inputNoteId.trim()}
                        >
                            Start Chat
                        </Button>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        You can find the Note ID in the URL of a note page or
                        from the database.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            Chatting with Note: {noteId}
                        </h2>
                        <Button
                            variant="outline"
                            onClick={() => setIsChatActive(false)}
                        >
                            Change Note ID
                        </Button>
                    </div>
                    <ChatInterface noteId={noteId} />
                </div>
            )}
        </div>
    );
}
