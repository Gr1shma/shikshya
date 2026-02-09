"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { useSession } from "~/lib/auth-client";
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
    const { data: session, isPending, error } = useSession();
    const [log, setLog] = useState<LogEntry[]>([]);
    const [testUserId, setTestUserId] = useState<string | null>(null);
    const [testCourseId, setTestCourseId] = useState<string | null>(null);
    const [testNoteId, setTestNoteId] = useState<string | null>(null);
    const [testMessageId, setTestMessageId] = useState<string | null>(null);
    const [testAccountId, setTestAccountId] = useState<string | null>(null);
    const [testSessionId, setTestSessionId] = useState<string | null>(null);
    const [testVerificationId, setTestVerificationId] = useState<string | null>(
        null
    );
    const sessionUserId = session?.user?.id ?? null;
    const canUse = Boolean(sessionUserId);
    const effectiveUserId = testUserId ?? sessionUserId;

    const logLine = (text: string) => {
        setLog((prev) => [{ id: makeId(), text }, ...prev].slice(0, 50));
    };

    const userList = api.user.list.useQuery(undefined, { enabled: false });
    const userById = api.user.getById.useQuery(
        { id: testUserId ?? "" },
        { enabled: false }
    );

    const accountList = api.account.list.useQuery(undefined, {
        enabled: false,
    });
    const accountById = api.account.getById.useQuery(
        { id: testAccountId ?? "" },
        { enabled: false }
    );

    const sessionList = api.session.list.useQuery(undefined, {
        enabled: false,
    });
    const sessionById = api.session.getById.useQuery(
        { id: testSessionId ?? "" },
        { enabled: false }
    );

    const verificationList = api.verification.list.useQuery(undefined, {
        enabled: false,
    });
    const verificationById = api.verification.getById.useQuery(
        { id: testVerificationId ?? "" },
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

    const userCreate = api.user.create.useMutation();
    const userUpdate = api.user.update.useMutation();
    const userDelete = api.user.delete.useMutation();

    const accountCreate = api.account.create.useMutation();
    const accountUpdate = api.account.update.useMutation();
    const accountDelete = api.account.delete.useMutation();

    const sessionCreate = api.session.create.useMutation();
    const sessionUpdate = api.session.update.useMutation();
    const sessionDelete = api.session.delete.useMutation();

    const verificationCreate = api.verification.create.useMutation();
    const verificationUpdate = api.verification.update.useMutation();
    const verificationDelete = api.verification.delete.useMutation();

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
            return data;
        } catch (err) {
            logLine(`${label}: error ${String(err)}`);
            return null;
        }
    };

    const onCreateUser = async () => {
        const id = makeId();
        const email = `test+${id}@example.com`;
        const created = await safeRefetch("user.create", () =>
            userCreate.mutateAsync({
                id,
                name: "Test User",
                email,
                role: "student",
            })
        );
        if (created && typeof created === "object" && "id" in created) {
            setTestUserId(String(created.id));
        } else {
            setTestUserId(id);
        }
    };

    const onUpdateUser = async () => {
        if (!testUserId) return;
        await safeRefetch("user.update", () =>
            userUpdate.mutateAsync({
                id: testUserId,
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
        setTestMessageId(null);
    };

    const onCreateAccount = async () => {
        if (!effectiveUserId) return;
        const id = makeId();
        const created = await safeRefetch("account.create", () =>
            accountCreate.mutateAsync({
                id,
                accountId: makeId(),
                providerId: "test",
                userId: effectiveUserId,
            })
        );
        if (created && typeof created === "object" && "id" in created) {
            setTestAccountId(String(created.id));
        } else {
            setTestAccountId(id);
        }
    };

    const onUpdateAccount = async () => {
        if (!testAccountId) return;
        await safeRefetch("account.update", () =>
            accountUpdate.mutateAsync({
                id: testAccountId,
                scope: "updated",
            })
        );
    };

    const onDeleteAccount = async () => {
        if (!testAccountId) return;
        await safeRefetch("account.delete", () =>
            accountDelete.mutateAsync({ id: testAccountId })
        );
        setTestAccountId(null);
    };

    const onCreateSession = async () => {
        if (!effectiveUserId) return;
        const id = makeId();
        const created = await safeRefetch("session.create", () =>
            sessionCreate.mutateAsync({
                id,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60),
                token: makeId(),
                userId: effectiveUserId,
            })
        );
        if (created && typeof created === "object" && "id" in created) {
            setTestSessionId(String(created.id));
        } else {
            setTestSessionId(id);
        }
    };

    const onUpdateSession = async () => {
        if (!testSessionId) return;
        await safeRefetch("session.update", () =>
            sessionUpdate.mutateAsync({
                id: testSessionId,
                token: makeId(),
            })
        );
    };

    const onDeleteSession = async () => {
        if (!testSessionId) return;
        await safeRefetch("session.delete", () =>
            sessionDelete.mutateAsync({ id: testSessionId })
        );
        setTestSessionId(null);
    };

    const onCreateVerification = async () => {
        const id = makeId();
        const created = await safeRefetch("verification.create", () =>
            verificationCreate.mutateAsync({
                id,
                identifier: `test-${id}`,
                value: makeId(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 10),
            })
        );
        if (created && typeof created === "object" && "id" in created) {
            setTestVerificationId(String(created.id));
        } else {
            setTestVerificationId(id);
        }
    };

    const onUpdateVerification = async () => {
        if (!testVerificationId) return;
        await safeRefetch("verification.update", () =>
            verificationUpdate.mutateAsync({
                id: testVerificationId,
                value: makeId(),
            })
        );
    };

    const onDeleteVerification = async () => {
        if (!testVerificationId) return;
        await safeRefetch("verification.delete", () =>
            verificationDelete.mutateAsync({ id: testVerificationId })
        );
        setTestVerificationId(null);
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
                            testUserId
                                ? safeRefetch("user.getById", () =>
                                      userById.refetch()
                                  )
                                : logLine("user.getById: missing test user")
                        }
                    >
                        user.getById
                    </Button>
                    <Button onClick={onCreateUser}>user.create</Button>
                    <Button onClick={onUpdateUser} disabled={!testUserId}>
                        user.update
                    </Button>
                    <Button onClick={onDeleteUser} disabled={!testUserId}>
                        user.delete
                    </Button>
                </div>
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
                <h2 className="text-lg font-semibold">Session</h2>
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() =>
                            safeRefetch("session.list", () =>
                                sessionList.refetch()
                            )
                        }
                    >
                        session.list
                    </Button>
                    <Button
                        onClick={() =>
                            testSessionId
                                ? safeRefetch("session.getById", () =>
                                      sessionById.refetch()
                                  )
                                : logLine(
                                      "session.getById: missing test session"
                                  )
                        }
                    >
                        session.getById
                    </Button>
                    <Button
                        onClick={onCreateSession}
                        disabled={!effectiveUserId}
                    >
                        session.create
                    </Button>
                    <Button onClick={onUpdateSession} disabled={!testSessionId}>
                        session.update
                    </Button>
                    <Button onClick={onDeleteSession} disabled={!testSessionId}>
                        session.delete
                    </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                    testSessionId: {testSessionId ?? "(none)"}
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Account</h2>
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() =>
                            safeRefetch("account.list", () =>
                                accountList.refetch()
                            )
                        }
                    >
                        account.list
                    </Button>
                    <Button
                        onClick={() =>
                            testAccountId
                                ? safeRefetch("account.getById", () =>
                                      accountById.refetch()
                                  )
                                : logLine(
                                      "account.getById: missing test account"
                                  )
                        }
                    >
                        account.getById
                    </Button>
                    <Button
                        onClick={onCreateAccount}
                        disabled={!effectiveUserId}
                    >
                        account.create
                    </Button>
                    <Button onClick={onUpdateAccount} disabled={!testAccountId}>
                        account.update
                    </Button>
                    <Button onClick={onDeleteAccount} disabled={!testAccountId}>
                        account.delete
                    </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                    testAccountId: {testAccountId ?? "(none)"}
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Verification</h2>
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() =>
                            safeRefetch("verification.list", () =>
                                verificationList.refetch()
                            )
                        }
                    >
                        verification.list
                    </Button>
                    <Button
                        onClick={() =>
                            testVerificationId
                                ? safeRefetch("verification.getById", () =>
                                      verificationById.refetch()
                                  )
                                : logLine(
                                      "verification.getById: missing test verification"
                                  )
                        }
                    >
                        verification.getById
                    </Button>
                    <Button onClick={onCreateVerification}>
                        verification.create
                    </Button>
                    <Button
                        onClick={onUpdateVerification}
                        disabled={!testVerificationId}
                    >
                        verification.update
                    </Button>
                    <Button
                        onClick={onDeleteVerification}
                        disabled={!testVerificationId}
                    >
                        verification.delete
                    </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                    testVerificationId: {testVerificationId ?? "(none)"}
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
