"use client";

import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { signOut, signUp, useSession } from "~/lib/auth-client";
import { api } from "~/trpc/react";

type LogEntry = {
    id: string;
    text: string;
};

const makeId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `id_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
};

export function TestRoutersClient() {
    const { data: session, isPending, error, refetch } = useSession();
    const [log, setLog] = useState<LogEntry[]>([]);
    const [testUserId, setTestUserId] = useState<string | null>(null);
    const [testCourseId, setTestCourseId] = useState<string | null>(null);
    const [testNoteId, setTestNoteId] = useState<string | null>(null);
    const [testMessageId, setTestMessageId] = useState<string | null>(null);
    const sessionUserId = session?.user?.id ?? null;
    const canUse = Boolean(sessionUserId);
    const effectiveUserId = testUserId ?? sessionUserId;

    const logLine = (text: string) => {
        setLog((prev) => [{ id: makeId(), text }, ...prev].slice(0, 50));
    };

    const userList = api.user.list.useQuery(undefined, { enabled: false });
    const userById = api.user.getById.useQuery(
        { id: effectiveUserId ?? "" },
        { enabled: false }
    );

    const courseList = api.course.list.useQuery(undefined, { enabled: false });
    const courseById = api.course.getById.useQuery(
        { id: testCourseId ?? "00000000-0000-0000-0000-000000000000" },
        { enabled: false }
    );

    const enrollmentList = api.enrollment.list.useQuery(undefined, {
        enabled: false,
    });
    const enrollmentById = api.enrollment.getById.useQuery(
        {
            userId: effectiveUserId ?? "",
            courseId: testCourseId ?? "00000000-0000-0000-0000-000000000000",
        },
        { enabled: false }
    );

    const noteList = api.note.list.useQuery(undefined, { enabled: false });
    const noteById = api.note.getById.useQuery(
        { id: testNoteId ?? "00000000-0000-0000-0000-000000000000" },
        { enabled: false }
    );

    const messageList = api.message.list.useQuery(undefined, {
        enabled: false,
    });
    const messageById = api.message.getById.useQuery(
        { id: testMessageId ?? "" },
        { enabled: false }
    );

    const userUpdate = api.user.update.useMutation();
    const userDelete = api.user.delete.useMutation();

    const courseCreate = api.course.create.useMutation();
    const courseUpdate = api.course.update.useMutation();
    const courseDelete = api.course.delete.useMutation();

    const enrollmentCreate = api.enrollment.create.useMutation();
    const enrollmentUpdate = api.enrollment.update.useMutation();
    const enrollmentDelete = api.enrollment.delete.useMutation();

    const noteCreate = api.note.create.useMutation();
    const noteUpdate = api.note.update.useMutation();
    const noteDelete = api.note.delete.useMutation();

    const messageCreate = api.message.create.useMutation();
    const messageUpdate = api.message.update.useMutation();
    const messageDelete = api.message.delete.useMutation();

    const safeRefetch = async (label: string, fn: () => Promise<unknown>) => {
        try {
            const data = await fn();
            logLine(`${label}: ok`);
            logLine(`${label}: data ${JSON.stringify(data)}`);
            return data;
        } catch (err) {
            logLine(`${label}: error ${String(err)}`);
            return null;
        }
    };

    // Here we are first creating a new user throught sign-up process and the updaing the role
    const onCreateUser = async () => {
        const id = makeId();
        const email = `test+${id}@example.com`;
        const password = `Test!${id}`;

        await safeRefetch("auth.signOut", async () => {
            await signOut();
        });

        const result = await signUp.email({
            email,
            name: "Test User",
            password,
        });

        if ("error" in result && result.error) {
            logLine(`auth.signUp: error ${result.error.message ?? "unknown"}`);
            return;
        }

        logLine("auth.signUp: ok");

        let newUserId: string | null = null;
        if ("data" in result && result.data?.user?.id) {
            newUserId = String(result.data.user.id);
            setTestUserId(newUserId);
        }

        await safeRefetch("auth.session.refetch", () => refetch());

        if (newUserId) {
            await safeRefetch("user.update.role", () =>
                userUpdate.mutateAsync({
                    id: newUserId,
                    role: "teacher",
                })
            );
        }
    };

    const onUpdateUser = async () => {
        if (!effectiveUserId) return;
        await safeRefetch("user.update", () =>
            userUpdate.mutateAsync({
                id: effectiveUserId,
                name: "Updated User",
            })
        );
    };

    const onDeleteUser = async () => {
        if (!testUserId) return;
        await safeRefetch("user.delete", () =>
            userDelete.mutateAsync({ id: testUserId })
        );
        setTestUserId(null);
    };

    useEffect(() => {
        if (!testUserId && sessionUserId) {
            setTestUserId(sessionUserId);
        }
    }, [sessionUserId, testUserId]);

    const onCreateCourse = async () => {
        if (!effectiveUserId) return;
        const created = await safeRefetch("course.create", () =>
            courseCreate.mutateAsync({
                title: "Test Course",
                description: "Demo course",
                joinCode: makeId().slice(0, 8),
                teacherId: effectiveUserId,
            })
        );
        if (created && typeof created === "object" && "id" in created) {
            setTestCourseId(String(created.id));
        }
    };

    const onUpdateCourse = async () => {
        if (!testCourseId) return;
        await safeRefetch("course.update", () =>
            courseUpdate.mutateAsync({
                id: testCourseId,
                title: "Updated Course",
            })
        );
    };

    const onDeleteCourse = async () => {
        if (!testCourseId) return;
        await safeRefetch("course.delete", () =>
            courseDelete.mutateAsync({ id: testCourseId })
        );
        setTestCourseId(null);
    };

    const onCreateEnrollment = async () => {
        if (!effectiveUserId || !testCourseId) return;
        await safeRefetch("enrollment.create", () =>
            enrollmentCreate.mutateAsync({
                userId: effectiveUserId,
                courseId: testCourseId,
            })
        );
    };

    const onUpdateEnrollment = async () => {
        if (!effectiveUserId || !testCourseId) return;
        await safeRefetch("enrollment.update", () =>
            enrollmentUpdate.mutateAsync({
                userId: effectiveUserId,
                courseId: testCourseId,
            })
        );
    };

    const onDeleteEnrollment = async () => {
        if (!effectiveUserId || !testCourseId) return;
        await safeRefetch("enrollment.delete", () =>
            enrollmentDelete.mutateAsync({
                userId: effectiveUserId,
                courseId: testCourseId,
            })
        );
    };

    const onCreateNote = async () => {
        if (!testCourseId) return;
        const created = await safeRefetch("note.create", () =>
            noteCreate.mutateAsync({
                title: "Test Note",
                fileUrl: "https://example.com/file.pdf",
                textContent: "Demo note",
                courseId: testCourseId,
            })
        );
        if (created && typeof created === "object" && "id" in created) {
            setTestNoteId(String(created.id));
        }
    };

    const onUpdateNote = async () => {
        if (!testNoteId) return;
        await safeRefetch("note.update", () =>
            noteUpdate.mutateAsync({
                id: testNoteId,
                title: "Updated Note",
            })
        );
    };

    const onDeleteNote = async () => {
        if (!testNoteId) return;
        await safeRefetch("note.delete", () =>
            noteDelete.mutateAsync({ id: testNoteId })
        );
        setTestNoteId(null);
    };

    const onCreateMessage = async () => {
        if (!effectiveUserId || !testNoteId) return;
        const id = makeId();
        const created = await safeRefetch("message.create", () =>
            messageCreate.mutateAsync({
                id,
                role: "user",
                content: "Hello from test message",
                noteId: testNoteId,
                userId: effectiveUserId,
            })
        );
        if (created && typeof created === "object" && "id" in created) {
            setTestMessageId(String(created.id));
        } else {
            setTestMessageId(id);
        }
    };

    const onUpdateMessage = async () => {
        if (!testMessageId) return;
        await safeRefetch("message.update", () =>
            messageUpdate.mutateAsync({
                id: testMessageId,
                content: "Updated message",
            })
        );
    };

    const onDeleteMessage = async () => {
        if (!testMessageId) return;
        await safeRefetch("message.delete", () =>
            messageDelete.mutateAsync({ id: testMessageId })
        );
    };

    if (isPending) {
        return (
            <div className="rounded-md border p-4">
                <p className="text-muted-foreground text-sm">
                    Loading session...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-md border p-4">
                <p className="text-destructive text-sm">
                    Failed to load session. Try refreshing the page.
                </p>
            </div>
        );
    }

    if (!canUse) {
        return (
            <div className="rounded-md border p-4">
                <p className="text-sm">
                    Sign in to enable the router test buttons.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-lg font-semibold">User</h2>
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() =>
                            safeRefetch("user.list", () => userList.refetch())
                        }
                    >
                        user.list
                    </Button>
                    <Button
                        onClick={() =>
                            effectiveUserId
                                ? safeRefetch("user.getById", () =>
                                      userById.refetch()
                                  )
                                : logLine("user.getById: missing test user")
                        }
                    >
                        user.getById
                    </Button>
                    <Button onClick={onCreateUser}>user.create</Button>
                    <Button onClick={onUpdateUser} disabled={!effectiveUserId}>
                        user.update
                    </Button>
                    <Button onClick={onDeleteUser} disabled={!testUserId}>
                        user.delete
                    </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                    sessionUserId: {sessionUserId ?? "(none)"}
                </p>
                <p className="text-muted-foreground text-xs">
                    testUserId: {testUserId ?? "(none)"}
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Course</h2>
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() =>
                            safeRefetch("course.list", () =>
                                courseList.refetch()
                            )
                        }
                    >
                        course.list
                    </Button>
                    <Button
                        onClick={() =>
                            testCourseId
                                ? safeRefetch("course.getById", () =>
                                      courseById.refetch()
                                  )
                                : logLine("course.getById: missing test course")
                        }
                    >
                        course.getById
                    </Button>
                    <Button
                        onClick={onCreateCourse}
                        disabled={!effectiveUserId}
                    >
                        course.create
                    </Button>
                    <Button onClick={onUpdateCourse} disabled={!testCourseId}>
                        course.update
                    </Button>
                    <Button onClick={onDeleteCourse} disabled={!testCourseId}>
                        course.delete
                    </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                    testCourseId: {testCourseId ?? "(none)"}
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Enrollment</h2>
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() =>
                            safeRefetch("enrollment.list", () =>
                                enrollmentList.refetch()
                            )
                        }
                    >
                        enrollment.list
                    </Button>
                    <Button
                        onClick={() =>
                            effectiveUserId && testCourseId
                                ? safeRefetch("enrollment.getById", () =>
                                      enrollmentById.refetch()
                                  )
                                : logLine("enrollment.getById: missing ids")
                        }
                    >
                        enrollment.getById
                    </Button>
                    <Button
                        onClick={onCreateEnrollment}
                        disabled={!effectiveUserId || !testCourseId}
                    >
                        enrollment.create
                    </Button>
                    <Button
                        onClick={onUpdateEnrollment}
                        disabled={!effectiveUserId || !testCourseId}
                    >
                        enrollment.update
                    </Button>
                    <Button
                        onClick={onDeleteEnrollment}
                        disabled={!effectiveUserId || !testCourseId}
                    >
                        enrollment.delete
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Note</h2>
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() =>
                            safeRefetch("note.list", () => noteList.refetch())
                        }
                    >
                        note.list
                    </Button>
                    <Button
                        onClick={() =>
                            testNoteId
                                ? safeRefetch("note.getById", () =>
                                      noteById.refetch()
                                  )
                                : logLine("note.getById: missing test note")
                        }
                    >
                        note.getById
                    </Button>
                    <Button onClick={onCreateNote} disabled={!testCourseId}>
                        note.create
                    </Button>
                    <Button onClick={onUpdateNote} disabled={!testNoteId}>
                        note.update
                    </Button>
                    <Button onClick={onDeleteNote} disabled={!testNoteId}>
                        note.delete
                    </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                    testNoteId: {testNoteId ?? "(none)"}
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Message</h2>
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() =>
                            safeRefetch("message.list", () =>
                                messageList.refetch()
                            )
                        }
                    >
                        message.list
                    </Button>
                    <Button
                        onClick={() =>
                            testMessageId
                                ? safeRefetch("message.getById", () =>
                                      messageById.refetch()
                                  )
                                : logLine(
                                      "message.getById: missing test message"
                                  )
                        }
                    >
                        message.getById
                    </Button>
                    <Button
                        onClick={onCreateMessage}
                        disabled={!effectiveUserId || !testNoteId}
                    >
                        message.create
                    </Button>
                    <Button onClick={onUpdateMessage} disabled={!testMessageId}>
                        message.update
                    </Button>
                    <Button onClick={onDeleteMessage} disabled={!testMessageId}>
                        message.delete
                    </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                    testMessageId: {testMessageId ?? "(none)"}
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Logs</h2>
                <div className="rounded-md border p-3 text-xs">
                    {log.length === 0 ? (
                        <p className="text-muted-foreground">No actions yet.</p>
                    ) : (
                        <ul className="space-y-1">
                            {log.map((item) => (
                                <li key={item.id}>{item.text}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
