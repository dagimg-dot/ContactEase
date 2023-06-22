CREATE TABLE "public"."user" ("user_id" uuid NOT NULL DEFAULT gen_random_uuid(), "username" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, PRIMARY KEY ("user_id") , UNIQUE ("user_id"), UNIQUE ("username"), UNIQUE ("email"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
