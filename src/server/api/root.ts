import { courseRouter } from "~/server/api/routers/course";
import { enrollmentRouter } from "~/server/api/routers/enrollment";
import { folderRouter } from "~/server/api/routers/folder";
import { messageRouter } from "~/server/api/routers/message";
import { noteRouter } from "~/server/api/routers/note";
import { userRouter } from "~/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { healthRouter } from "~/server/api/routers/health";

export const appRouter = createTRPCRouter({
    course: courseRouter,
    enrollment: enrollmentRouter,
    folder: folderRouter,
    message: messageRouter,
    note: noteRouter,
    user: userRouter,
    health: healthRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
