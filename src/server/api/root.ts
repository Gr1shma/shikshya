import { courseRouter } from "~/server/api/routers/course";
import { enrollmentRouter } from "~/server/api/routers/enrollment";
import { folderRouter } from "~/server/api/routers/folder";
import { leaderboardRouter } from "~/server/api/routers/leaderboard";
import { messageRouter } from "~/server/api/routers/message";
import { noteRouter } from "~/server/api/routers/note";
import { statsRouter } from "~/server/api/routers/stats";
import { userRouter } from "~/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { healthRouter } from "~/server/api/routers/health";
import { activityRouter } from "~/server/api/routers/activity";
import { chatRouter } from "~/server/api/routers/chat";

export const appRouter = createTRPCRouter({
    course: courseRouter,
    enrollment: enrollmentRouter,
    folder: folderRouter,
    message: messageRouter,
    note: noteRouter,
    stats: statsRouter,
    activity: activityRouter,
    chat: chatRouter,
    leaderboard: leaderboardRouter,
    user: userRouter,
    health: healthRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
