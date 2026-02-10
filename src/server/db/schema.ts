import { relations } from "drizzle-orm";
import {
    boolean,
    date,
    index,
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uniqueIndex,
    uuid,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
    "admin",
    "teacher",
    "student",
]);

export const messageRoleEnum = pgEnum("message_role", [
    "user",
    "system",
    "assistant",
    "data",
    "tool",
]);

export const user = pgTable(
    "user",
    {
        id: text("id").primaryKey(),
        name: text("name").notNull(),
        email: text("email").notNull().unique(),
        emailVerified: boolean("email_verified")
            .$defaultFn(() => false)
            .notNull(),
        image: text("image"),
        role: userRoleEnum("role").notNull().default("student"),
        onboardingCompleted: boolean("onboarding_completed")
            .$defaultFn(() => false)
            .notNull(),
        createdAt: timestamp("created_at")
            .$defaultFn(() => new Date())
            .notNull(),
        updatedAt: timestamp("updated_at")
            .$defaultFn(() => new Date())
            .notNull(),
    },
    (table) => [index("user_email_idx").on(table.email)]
);

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const course = pgTable(
    "course",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        title: text("title").notNull(),
        description: text("description"),
        joinCode: text("join_code").notNull().unique(),
        teacherId: text("teacher_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at")
            .$defaultFn(() => new Date())
            .notNull(),
    },
    (table) => [index("course_teacher_idx").on(table.teacherId)]
);

export const enrollment = pgTable(
    "enrollment",
    {
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        courseId: uuid("course_id")
            .notNull()
            .references(() => course.id, { onDelete: "cascade" }),
        joinedAt: timestamp("joined_at")
            .$defaultFn(() => new Date())
            .notNull(),
    },
    (table) => [primaryKey({ columns: [table.userId, table.courseId] })]
);

export const folder = pgTable(
    "folder",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        name: text("name").notNull(),
        courseId: uuid("course_id")
            .notNull()
            .references(() => course.id, { onDelete: "cascade" }),
        parentId: uuid("parent_id"), // null = at course root level
        createdAt: timestamp("created_at")
            .$defaultFn(() => new Date())
            .notNull(),
    },
    (table) => [
        index("folder_parent_idx").on(table.parentId),
        index("folder_course_idx").on(table.courseId),
    ]
);

export const note = pgTable(
    "note",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        title: text("title").notNull(),
        fileUrl: text("file_url").notNull(),
        textContent: text("text_content"),
        courseId: uuid("course_id")
            .notNull()
            .references(() => course.id, { onDelete: "cascade" }),
        folderId: uuid("folder_id").references(() => folder.id, {
            onDelete: "set null",
        }), // null = at course root level
        createdAt: timestamp("created_at")
            .$defaultFn(() => new Date())
            .notNull(),
    },
    (table) => [
        index("note_course_idx").on(table.courseId),
        index("note_folder_idx").on(table.folderId),
    ]
);

export const message = pgTable(
    "message",
    {
        id: text("id").primaryKey(),
        role: messageRoleEnum("role").notNull(),
        content: text("content").notNull(),
        noteId: uuid("note_id")
            .notNull()
            .references(() => note.id, { onDelete: "cascade" }),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at")
            .$defaultFn(() => new Date())
            .notNull(),
    },
    (table) => [index("message_note_user_idx").on(table.noteId, table.userId)]
);

export const userStats = pgTable("user_stats", {
    userId: text("user_id")
        .primaryKey()
        .references(() => user.id, { onDelete: "cascade" }),
    totalPoints: integer("total_points").notNull().default(0),
    currentStreak: integer("current_streak").notNull().default(0),
    longestStreak: integer("longest_streak").notNull().default(0),
    lastStudyDate: date("last_study_date", { mode: "string" }),
    todayActiveMinutes: integer("today_active_minutes").notNull().default(0),
    todayChatCount: integer("today_chat_count").notNull().default(0),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});

export const studySession = pgTable(
    "study_sessions",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        noteId: uuid("note_id")
            .notNull()
            .references(() => note.id, { onDelete: "cascade" }),
        dayDate: date("day_date", { mode: "string" }).notNull(),
        activeSeconds: integer("active_seconds").notNull().default(0),
        pointsAwarded: integer("points_awarded").notNull().default(0),
        lastActivityAt: timestamp("last_activity_at"),
        createdAt: timestamp("created_at")
            .$defaultFn(() => new Date())
            .notNull(),
        updatedAt: timestamp("updated_at")
            .$defaultFn(() => new Date())
            .notNull(),
    },
    (table) => [
        uniqueIndex("study_sessions_user_note_day_idx").on(
            table.userId,
            table.noteId,
            table.dayDate
        ),
        index("study_sessions_user_day_idx").on(table.userId, table.dayDate),
    ]
);

export const noteCompletion = pgTable(
    "note_completion",
    {
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        noteId: uuid("note_id")
            .notNull()
            .references(() => note.id, { onDelete: "cascade" }),
        completedAt: timestamp("completed_at")
            .$defaultFn(() => new Date())
            .notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.userId, table.noteId] }),
        index("note_completion_user_idx").on(table.userId),
        index("note_completion_completed_at_idx").on(table.completedAt),
    ]
);

export const userRelations = relations(user, ({ many }) => ({
    accounts: many(account),
    sessions: many(session),
    coursesCreated: many(course),
    enrollments: many(enrollment),
    messages: many(message),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const courseRelations = relations(course, ({ one, many }) => ({
    teacher: one(user, { fields: [course.teacherId], references: [user.id] }),
    enrollments: many(enrollment),
    folders: many(folder),
    notes: many(note),
}));

export const enrollmentRelations = relations(enrollment, ({ one }) => ({
    user: one(user, { fields: [enrollment.userId], references: [user.id] }),
    course: one(course, {
        fields: [enrollment.courseId],
        references: [course.id],
    }),
}));

export const noteRelations = relations(note, ({ one, many }) => ({
    course: one(course, { fields: [note.courseId], references: [course.id] }),
    folder: one(folder, { fields: [note.folderId], references: [folder.id] }),
    messages: many(message),
}));

export const folderRelations = relations(folder, ({ one, many }) => ({
    course: one(course, { fields: [folder.courseId], references: [course.id] }),
    parent: one(folder, {
        fields: [folder.parentId],
        references: [folder.id],
        relationName: "folderParent",
    }),
    children: many(folder, { relationName: "folderParent" }),
    notes: many(note),
}));

export const messageRelations = relations(message, ({ one }) => ({
    note: one(note, { fields: [message.noteId], references: [note.id] }),
    user: one(user, { fields: [message.userId], references: [user.id] }),
}));

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Course = typeof course.$inferSelect;
export type NewCourse = typeof course.$inferInsert;

export type Enrollment = typeof enrollment.$inferSelect;
export type NewEnrollment = typeof enrollment.$inferInsert;

export type Note = typeof note.$inferSelect;
export type NewNote = typeof note.$inferInsert;

export type Message = typeof message.$inferSelect;
export type NewMessage = typeof message.$inferInsert;

export type Folder = typeof folder.$inferSelect;
export type NewFolder = typeof folder.$inferInsert;

export type UserStats = typeof userStats.$inferSelect;
export type NewUserStats = typeof userStats.$inferInsert;

export type StudySession = typeof studySession.$inferSelect;
export type NewStudySession = typeof studySession.$inferInsert;

export type NoteCompletion = typeof noteCompletion.$inferSelect;
export type NewNoteCompletion = typeof noteCompletion.$inferInsert;
