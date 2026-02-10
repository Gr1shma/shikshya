"use client";

import { useCallback, useEffect, useRef } from "react";
import { api } from "~/trpc/react";

const THROTTLE_MS = 12000;

export const useActivityPing = (noteId: string) => {
    const ping = api.activity.ping.useMutation();
    const lastSentRef = useRef(0);

    const sendPing = useCallback(
        (eventType: "scroll" | "page_change" | "chat" | "focus") => {
            const now = Date.now();
            if (now - lastSentRef.current < THROTTLE_MS) return;
            lastSentRef.current = now;
            ping.mutate({ noteId, eventType });
        },
        [noteId, ping]
    );

    useEffect(() => {
        const onScroll = () => sendPing("scroll");
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [sendPing]);

    return { sendPing, isPinging: ping.isPending };
};

export const GamificationHud = ({ noteId }: { noteId: string }) => {
    const statsQuery = api.stats.getMyStats.useQuery();
    const markCompleted = api.note.markCompleted.useMutation();
    const { sendPing } = useActivityPing(noteId);

    return (
        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-200">
            <button
                className="rounded-lg bg-indigo-600 px-3 py-1 text-white"
                onClick={() => sendPing("page_change")}
            >
                Ping Activity
            </button>
            <span>
                Points: {statsQuery.data?.totalPoints ?? 0}
            </span>
            <span>
                Today: {statsQuery.data?.todayActiveMinutes ?? 0} / 60
            </span>
            <span>
                Streak: 🔥 {statsQuery.data?.currentStreak ?? 0}
            </span>
            <button
                className="rounded-lg border border-white/10 px-3 py-1"
                onClick={() => markCompleted.mutate({ noteId })}
            >
                Mark Completed
            </button>
        </div>
    );
};

export const useStudentChatMessage = (noteId: string) => {
    const mutation = api.chat.onStudentMessage.useMutation();

    const sendMessage = (content: string) => {
        return mutation.mutateAsync({ noteId, content });
    };

    return {
        sendMessage,
        isSending: mutation.isPending,
    };
};
