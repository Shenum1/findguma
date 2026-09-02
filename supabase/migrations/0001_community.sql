-- Live Community Chat + gated Archive — initial schema.
-- Run this in the Supabase SQL editor (Dashboard -> SQL Editor) on a fresh project.
-- Safe to re-run: every statement is idempotent or guarded.

create extension if not exists "pgcrypto";

-- =========================================================
-- Tables
-- =========================================================

create table if not exists community_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  username_lower text not null generated always as (lower(username)) stored,
  role text not null default 'fan' check (role in ('fan', 'artist', 'moderator')),
  is_banned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint community_profiles_username_lower_key unique (username_lower)
);

create index if not exists community_profiles_username_lower_idx
  on community_profiles (username_lower);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references community_profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 500),
  -- Nullable self-reference: schema-ready for threaded replies, not built into the V1 UI.
  reply_to_id uuid references chat_messages(id) on delete set null,
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by uuid references community_profiles(id)
);

create index if not exists chat_messages_created_at_idx on chat_messages (created_at desc);
create index if not exists chat_messages_author_id_idx on chat_messages (author_id);

-- Schema-ready for reactions/presence/pinning — not wired into any V1 UI yet.
create table if not exists chat_reactions (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references chat_messages(id) on delete cascade,
  profile_id uuid not null references community_profiles(id) on delete cascade,
  emoji text not null,
  created_at timestamptz not null default now(),
  unique (message_id, profile_id, emoji)
);

create table if not exists chat_presence (
  profile_id uuid primary key references community_profiles(id) on delete cascade,
  last_seen_at timestamptz not null default now(),
  is_online boolean not null default false
);

create table if not exists chat_pinned_messages (
  message_id uuid primary key references chat_messages(id) on delete cascade,
  pinned_by uuid not null references community_profiles(id),
  pinned_at timestamptz not null default now()
);

create table if not exists chat_reports (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references chat_messages(id) on delete cascade,
  reporter_id uuid not null references community_profiles(id),
  reason text not null check (char_length(reason) between 1 and 300),
  status text not null default 'open' check (status in ('open', 'reviewed', 'dismissed')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references community_profiles(id)
);

create table if not exists chat_bans (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references community_profiles(id) on delete cascade,
  banned_by uuid references community_profiles(id),
  reason text,
  created_at timestamptz not null default now(),
  expires_at timestamptz -- null = permanent
);

-- Gated Archive "Unreleased" section. The client never sees storage_path directly;
-- see app/api/archive/unreleased/[slug]/signed-url/route.ts.
create table if not exists unreleased_content (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  kind text not null check (kind in ('audio', 'video')),
  storage_path text not null,
  poster_storage_path text,
  duration_seconds int,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- =========================================================
-- Helpers
-- =========================================================

create or replace function is_moderator(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from community_profiles
    where id = uid and role in ('artist', 'moderator')
  );
$$;

-- =========================================================
-- Row Level Security
-- =========================================================

alter table community_profiles enable row level security;
alter table chat_messages enable row level security;
alter table chat_reactions enable row level security;
alter table chat_presence enable row level security;
alter table chat_pinned_messages enable row level security;
alter table chat_reports enable row level security;
alter table chat_bans enable row level security;
alter table unreleased_content enable row level security;

drop policy if exists "profiles are publicly readable" on community_profiles;
create policy "profiles are publicly readable"
  on community_profiles for select
  using (true);

drop policy if exists "users insert their own profile" on community_profiles;
create policy "users insert their own profile"
  on community_profiles for insert
  with check (auth.uid() = id);

drop policy if exists "users update their own profile" on community_profiles;
create policy "users update their own profile"
  on community_profiles for update
  using (auth.uid() = id);

-- Public read (lurkers can watch without an account), deleted rows included:
-- soft-deletes are masked client-side ("[message removed]"), not hidden by
-- RLS, so a moderator's delete propagates over the same Realtime channel to
-- everyone instantly instead of only taking effect on next reload.
drop policy if exists "messages are publicly readable" on chat_messages;
create policy "messages are publicly readable"
  on chat_messages for select
  using (true);

drop policy if exists "authenticated non-banned users can post" on chat_messages;
create policy "authenticated non-banned users can post"
  on chat_messages for insert
  with check (
    auth.uid() = author_id
    and not exists (
      select 1 from chat_bans b
      where b.profile_id = auth.uid()
        and (b.expires_at is null or b.expires_at > now())
    )
  );

drop policy if exists "author or moderator can soft-delete" on chat_messages;
create policy "author or moderator can soft-delete"
  on chat_messages for update
  using (auth.uid() = author_id or is_moderator(auth.uid()));

drop policy if exists "reactions are publicly readable" on chat_reactions;
create policy "reactions are publicly readable"
  on chat_reactions for select using (true);
drop policy if exists "users manage their own reactions" on chat_reactions;
create policy "users manage their own reactions"
  on chat_reactions for insert with check (auth.uid() = profile_id);
drop policy if exists "users remove their own reactions" on chat_reactions;
create policy "users remove their own reactions"
  on chat_reactions for delete using (auth.uid() = profile_id);

drop policy if exists "presence is publicly readable" on chat_presence;
create policy "presence is publicly readable"
  on chat_presence for select using (true);
drop policy if exists "users update their own presence" on chat_presence;
create policy "users update their own presence"
  on chat_presence for insert with check (auth.uid() = profile_id);
drop policy if exists "users update their own presence row" on chat_presence;
create policy "users update their own presence row"
  on chat_presence for update using (auth.uid() = profile_id);

drop policy if exists "pins are publicly readable" on chat_pinned_messages;
create policy "pins are publicly readable"
  on chat_pinned_messages for select using (true);
drop policy if exists "moderators manage pins" on chat_pinned_messages;
create policy "moderators manage pins"
  on chat_pinned_messages for insert with check (is_moderator(auth.uid()));
drop policy if exists "moderators remove pins" on chat_pinned_messages;
create policy "moderators remove pins"
  on chat_pinned_messages for delete using (is_moderator(auth.uid()));

drop policy if exists "authenticated users file reports" on chat_reports;
create policy "authenticated users file reports"
  on chat_reports for insert
  with check (auth.uid() = reporter_id);

drop policy if exists "moderators read reports" on chat_reports;
create policy "moderators read reports"
  on chat_reports for select
  using (is_moderator(auth.uid()));

drop policy if exists "moderators update reports" on chat_reports;
create policy "moderators update reports"
  on chat_reports for update
  using (is_moderator(auth.uid()));

drop policy if exists "moderators read bans" on chat_bans;
create policy "moderators read bans"
  on chat_bans for select using (is_moderator(auth.uid()));
drop policy if exists "moderators manage bans" on chat_bans;
create policy "moderators manage bans"
  on chat_bans for insert with check (is_moderator(auth.uid()));
drop policy if exists "moderators update bans" on chat_bans;
create policy "moderators update bans"
  on chat_bans for update using (is_moderator(auth.uid()));

-- Metadata only — visible to any signed-in user. The actual media bytes are
-- protected separately by a private Storage bucket + server-minted signed URLs
-- (see app/api/archive/unreleased/**), never by RLS alone.
drop policy if exists "authenticated users read unreleased metadata" on unreleased_content;
create policy "authenticated users read unreleased metadata"
  on unreleased_content for select
  using (auth.role() = 'authenticated' and published = true);

-- No insert/update/delete policies on unreleased_content: for V1 the artist
-- manages rows via the Supabase Studio table editor (service-role access),
-- there is no admin UI in this app yet.
