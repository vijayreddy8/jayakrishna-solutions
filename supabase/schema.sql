-- Jayakrishna Solutions — initial Supabase schema
-- Apply only in a dedicated Supabase project after reviewing the policies.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'student' check (role in ('student','teacher','admin')),
  preferred_language text not null default 'English',
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id text primary key,
  title text not null,
  description text not null default '',
  category text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  access_status text not null default 'pending' check (access_status in ('pending','active','revoked')),
  payment_reference text unique,
  created_at timestamptz not null default now(),
  unique(user_id, course_id)
);

create table if not exists public.class_sessions (
  id uuid primary key default gen_random_uuid(),
  course_id text not null references public.courses(id) on delete cascade,
  title text not null,
  room_name text not null unique,
  starts_at timestamptz,
  status text not null default 'scheduled' check (status in ('scheduled','live','ended','cancelled')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id text primary key,
  course_id text not null references public.courses(id) on delete cascade,
  title text not null,
  description text not null default '',
  video_provider text not null default 'youtube',
  video_id text,
  position integer not null default 0,
  published boolean not null default false
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.class_sessions enable row level security;
alter table public.lessons enable row level security;

create policy "Users can read their own profile" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "Users can update their own basic profile" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "Authenticated users can read published courses" on public.courses
  for select to authenticated using (published = true);
create policy "Learners can read their own enrolments" on public.enrollments
  for select to authenticated using (auth.uid() = user_id);
create policy "Authenticated users can read scheduled sessions" on public.class_sessions
  for select to authenticated using (status in ('scheduled','live'));
create policy "Authenticated users can read published lessons" on public.lessons
  for select to authenticated using (
    published = true and exists (
      select 1 from public.courses c where c.id = course_id and c.published = true
    )
  );

-- Insert courses through a trusted admin workflow. Never allow clients to grant their
-- own enrolments or set role=admin. Payment webhooks must be verified server-side.
