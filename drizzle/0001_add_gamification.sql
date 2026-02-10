CREATE TABLE "user_stats" (
    "user_id" text PRIMARY KEY REFERENCES "user"("id") ON DELETE CASCADE,
    "total_points" integer NOT NULL DEFAULT 0,
    "current_streak" integer NOT NULL DEFAULT 0,
    "longest_streak" integer NOT NULL DEFAULT 0,
    "last_study_date" date,
    "today_active_minutes" integer NOT NULL DEFAULT 0,
    "today_chat_count" integer NOT NULL DEFAULT 0,
    "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE "study_sessions" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "note_id" uuid NOT NULL REFERENCES "note"("id") ON DELETE CASCADE,
    "day_date" date NOT NULL,
    "active_seconds" integer NOT NULL DEFAULT 0,
    "points_awarded" integer NOT NULL DEFAULT 0,
    "last_activity_at" timestamp,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX "study_sessions_user_note_day_idx"
    ON "study_sessions" ("user_id", "note_id", "day_date");

CREATE INDEX "study_sessions_user_day_idx"
    ON "study_sessions" ("user_id", "day_date");

CREATE TABLE "note_completion" (
    "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "note_id" uuid NOT NULL REFERENCES "note"("id") ON DELETE CASCADE,
    "completed_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("user_id", "note_id")
);

CREATE INDEX "note_completion_user_idx"
    ON "note_completion" ("user_id");

CREATE INDEX "note_completion_completed_at_idx"
    ON "note_completion" ("completed_at");
