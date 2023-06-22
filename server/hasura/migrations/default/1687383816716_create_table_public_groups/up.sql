CREATE TABLE "public"."groups" ("group_id" uuid NOT NULL DEFAULT gen_random_uuid(), "group_name" text NOT NULL, PRIMARY KEY ("group_id") , UNIQUE ("group_id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
