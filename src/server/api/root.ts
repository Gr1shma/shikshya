import { accountRouter } from "~/server/api/routers/account";
import { courseRouter } from "~/server/api/routers/course";
import { enrollmentRouter } from "~/server/api/routers/enrollment";
import { messageRouter } from "~/server/api/routers/message";
import { noteRouter } from "~/server/api/routers/note";
import { sessionRouter } from "~/server/api/routers/session";
import { userRouter } from "~/server/api/routers/user";
import { verificationRouter } from "~/server/api/routers/verification";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { healthRouter } from "~/server/api/routers/health";

export const appRouter = createTRPCRouter({
    account: accountRouter,
    course: courseRouter,
    enrollment: enrollmentRouter,
    message: messageRouter,
    note: noteRouter,
    session: sessionRouter,
    user: userRouter,
    verification: verificationRouter,
    health: healthRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
