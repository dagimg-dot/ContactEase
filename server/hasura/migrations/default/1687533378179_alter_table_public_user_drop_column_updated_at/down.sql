alter table "public"."user" alter column "updated_at" set default now();
alter table "public"."user" alter column "updated_at" drop not null;
alter table "public"."user" add column "updated_at" timestamptz;
