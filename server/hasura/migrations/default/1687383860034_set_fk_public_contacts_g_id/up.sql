alter table "public"."contacts"
  add constraint "contacts_g_id_fkey"
  foreign key ("g_id")
  references "public"."groups"
  ("group_id") on update restrict on delete restrict;
