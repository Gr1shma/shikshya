ALTER TABLE "user"
    ADD COLUMN "teacher_verified" boolean NOT NULL DEFAULT false;

UPDATE "user"
SET "teacher_verified" = true
WHERE "role" = 'teacher';
