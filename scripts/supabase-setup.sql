-- Jarurat Care Community database setup for a NEW, EMPTY Supabase project.
-- Do not run this on production or on a project that already contains these tables.
-- This creates tables and indexes and enables RLS. It intentionally does not add
-- application access policies; configure reviewed least-privilege policies before
-- allowing the application to access these tables.

begin;

create extension if not exists "uuid-ossp" with schema extensions;

-- Identity and profile tables must be created before tables that reference them.
create table public.profiles (
  id uuid not null,
  email text null,
  full_name text null,
  role text null default 'Reader'::text,
  created_at timestamp with time zone null default now(),
  profile_completed boolean null default false,
  verification_status text null default 'pending'::text,
  profession text null,
  location text null,
  organization text null,
  qualification text null,
  designation text null,
  specialization text null,
  affiliation text null,
  medical_reg_id text null,
  city_state text null,
  experience text null,
  patients_treated text null,
  publications text null,
  awards text null,
  citations text null,
  is_confirmed boolean null default false,
  bio text null,
  interests text[] null default '{}'::text[],
  expertise text[] null default '{}'::text[],
  email_notifications boolean null default true,
  newsletters boolean null default false,
  event_updates boolean null default true,
  auth_provider text null,
  admin_role text null default 'None'::text,
  is_author boolean null default false,
  is_reviewer boolean null default false,
  avatar_url text null,
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign key (id) references auth.users (id)
) tablespace pg_default;

create table public.author_profiles (
  id uuid not null default gen_random_uuid(),
  user_id uuid null,
  name text null,
  email text null,
  designation text null,
  affiliation text null,
  bio text null,
  profile_image text null,
  created_at timestamp with time zone null default now(),
  constraint author_profiles_pkey primary key (id)
) tablespace pg_default;

create table public.author_requests (
  id uuid not null default gen_random_uuid(),
  user_id uuid null,
  qualification text null,
  research_area text null,
  reason text null,
  status text null default 'pending'::text,
  created_at timestamp with time zone null default now(),
  constraint author_requests_pkey primary key (id),
  constraint author_requests_user_id_fkey foreign key (user_id) references auth.users (id)
) tablespace pg_default;

-- Doctor-authored content and CMS-managed content.
create table public.articles (
  id uuid not null default gen_random_uuid(),
  author_id uuid not null,
  title text not null,
  excerpt text null,
  content text null,
  cover_image_url text null,
  category text null,
  status text not null default 'draft'::text,
  views integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  reviewer_id uuid null,
  review_feedback text null,
  reviewed_at timestamp with time zone null,
  likes_count integer null default 0,
  saves_count integer null default 0,
  tags text[] null default '{}'::text[],
  published_by uuid null,
  author_name_credentials text null,
  abstract text null,
  introduction text null,
  background text null,
  purpose text null,
  scope text null,
  explanation text null,
  evidence text null,
  examples text null,
  interpretation text null,
  implications text null,
  recommendations text null,
  conclusion_summary text null,
  takeaways text null,
  references_text text null,
  acknowledgements text null,
  appendix text null,
  constraint articles_pkey primary key (id),
  constraint articles_author_id_fkey foreign key (author_id) references profiles (id),
  constraint articles_published_by_fkey foreign key (published_by) references auth.users (id) on delete set null,
  constraint articles_reviewer_id_fkey foreign key (reviewer_id) references profiles (id),
  constraint articles_status_check check (
    status = any (
      array[
        'draft'::text,
        'under_review'::text,
        'published'::text,
        'rejected'::text
      ]
    )
  )
) tablespace pg_default;

create table public.cms_content (
  id uuid not null default gen_random_uuid(),
  content_type text not null,
  title text not null,
  slug text not null,
  content text null,
  featured_image text null,
  seo_title text null,
  seo_description text null,
  tags text[] null,
  category text null,
  status text not null default 'draft'::text,
  created_by uuid null,
  excerpt text null,
  published_at timestamp with time zone null,
  author_id uuid null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint cms_content_pkey primary key (id),
  constraint cms_content_slug_key unique (slug)
) tablespace pg_default;

create table public.testimonials (
  id uuid not null default gen_random_uuid(),
  user_id uuid null,
  name text not null,
  designation text null,
  content text not null,
  status text not null default 'draft'::text,
  admin_feedback text null,
  featured_image text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint testimonials_pkey primary key (id)
) tablespace pg_default;

-- Reader interactions and doctor follows.
create table public.article_comments (
  id uuid not null default gen_random_uuid(),
  article_id uuid not null,
  user_id uuid not null,
  content text not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint article_comments_pkey primary key (id),
  constraint article_comments_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
) tablespace pg_default;

create table public.article_likes (
  id uuid not null default gen_random_uuid(),
  article_id uuid not null,
  user_id uuid not null,
  created_at timestamp with time zone null default now(),
  content_type text not null default 'article'::text,
  constraint article_likes_pkey primary key (id),
  constraint article_likes_article_id_user_id_key unique (article_id, user_id),
  constraint article_likes_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
) tablespace pg_default;

create table public.saved_articles (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,
  article_id uuid not null,
  created_at timestamp with time zone not null default now(),
  content_type text not null default 'article'::text,
  constraint saved_articles_pkey primary key (id),
  constraint saved_articles_user_id_article_id_key unique (user_id, article_id),
  constraint saved_articles_user_id_fkey foreign key (user_id) references profiles (id)
) tablespace pg_default;

create table public.doctor_followers (
  id uuid not null default gen_random_uuid(),
  follower_id uuid not null,
  doctor_id uuid not null,
  created_at timestamp with time zone null default now(),
  constraint doctor_followers_pkey primary key (id),
  constraint doctor_followers_follower_id_doctor_id_key unique (follower_id, doctor_id),
  constraint doctor_followers_doctor_id_fkey foreign key (doctor_id) references auth.users (id) on delete cascade,
  constraint doctor_followers_follower_id_fkey foreign key (follower_id) references auth.users (id) on delete cascade
) tablespace pg_default;

create table public.doctor_follows (
  id uuid not null default gen_random_uuid(),
  follower_id uuid not null,
  doctor_id uuid not null,
  created_at timestamp with time zone null default now(),
  constraint doctor_follows_pkey primary key (id),
  constraint doctor_follows_follower_id_doctor_id_key unique (follower_id, doctor_id),
  constraint doctor_follows_doctor_id_fkey foreign key (doctor_id) references profiles (id) on delete cascade,
  constraint doctor_follows_follower_id_fkey foreign key (follower_id) references profiles (id) on delete cascade
) tablespace pg_default;

create table public.notifications (
  id uuid not null default gen_random_uuid(),
  user_id uuid null,
  title text not null,
  message text null,
  link text null,
  is_read boolean not null default false,
  created_at timestamp with time zone not null default now(),
  type text null default 'info'::text,
  constraint notifications_pkey primary key (id),
  constraint notifications_user_id_fkey foreign key (user_id) references profiles (id)
) tablespace pg_default;

-- Research records must exist before research interaction tables.
create table public.research_articles (
  id uuid not null default gen_random_uuid(),
  user_id uuid null,
  title text null,
  subtitle text null,
  abstract text null,
  keywords text null,
  introduction text null,
  methods text null,
  results text null,
  discussion text null,
  conclusion text null,
  funding text null,
  ethics_statement text null,
  acknowledgements text null,
  status text null default 'draft'::text,
  admin_feedback text null,
  featured_image text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  authors_and_affiliations text null,
  corresponding_author_details text null,
  literature_review text null,
  conflict_of_interest text null,
  author_contributions text null,
  data_availability text null,
  references_text text null,
  appendix text null,
  reviewer_id uuid null,
  published_by uuid null,
  views_count integer null default 0,
  likes_count integer null default 0,
  saves_count integer null default 0,
  constraint research_articles_pkey primary key (id),
  constraint research_articles_published_by_fkey foreign key (published_by) references auth.users (id) on delete set null,
  constraint research_articles_reviewer_id_fkey foreign key (reviewer_id) references auth.users (id) on delete set null
) tablespace pg_default;

create table public.research_article_comments (
  id uuid not null default extensions.uuid_generate_v4(),
  research_article_id uuid null,
  user_id uuid null,
  content text not null,
  created_at timestamp with time zone null default now(),
  constraint research_article_comments_pkey primary key (id),
  constraint research_article_comments_research_article_id_fkey foreign key (research_article_id) references research_articles (id) on delete cascade,
  constraint research_article_comments_user_id_fkey foreign key (user_id) references profiles (id) on delete cascade
) tablespace pg_default;

create table public.research_article_likes (
  id uuid not null default gen_random_uuid(),
  research_article_id uuid not null,
  user_id uuid not null,
  created_at timestamp with time zone null default now(),
  constraint research_article_likes_pkey primary key (id),
  constraint research_article_likes_research_article_id_user_id_key unique (research_article_id, user_id),
  constraint research_article_likes_research_article_id_fkey foreign key (research_article_id) references research_articles (id) on delete cascade,
  constraint research_article_likes_user_id_fkey foreign key (user_id) references profiles (id) on delete cascade
) tablespace pg_default;

create table public.saved_research_articles (
  id uuid not null default gen_random_uuid(),
  research_article_id uuid not null,
  user_id uuid not null,
  created_at timestamp with time zone null default now(),
  constraint saved_research_articles_pkey primary key (id),
  constraint saved_research_articles_research_article_id_user_id_key unique (research_article_id, user_id),
  constraint saved_research_articles_research_article_id_fkey foreign key (research_article_id) references research_articles (id) on delete cascade,
  constraint saved_research_articles_user_id_fkey foreign key (user_id) references profiles (id) on delete cascade
) tablespace pg_default;

create table public.review_comments (
  id uuid not null default gen_random_uuid(),
  article_id uuid null,
  reviewer_id uuid null,
  comment text not null,
  created_at timestamp with time zone null default now(),
  constraint review_comments_pkey primary key (id)
) tablespace pg_default;

create table public.analytics_events (
  id uuid not null default gen_random_uuid(),
  user_id uuid null,
  event_type text not null,
  content_id uuid null,
  content_type text null,
  session_id text null,
  created_at timestamp with time zone not null default now(),
  constraint analytics_events_pkey primary key (id),
  constraint analytics_events_user_id_fkey foreign key (user_id) references profiles (id) on delete set null
) tablespace pg_default;

create index if not exists analytics_events_created_at_idx on public.analytics_events using btree (created_at) tablespace pg_default;
create index if not exists analytics_events_event_type_idx on public.analytics_events using btree (event_type) tablespace pg_default;
create index if not exists analytics_events_user_id_idx on public.analytics_events using btree (user_id) tablespace pg_default;
create index if not exists analytics_events_content_id_idx on public.analytics_events using btree (content_id) tablespace pg_default;
create index if not exists idx_research_article_likes_article on public.research_article_likes using btree (research_article_id) tablespace pg_default;
create index if not exists idx_research_article_likes_user on public.research_article_likes using btree (user_id) tablespace pg_default;
create index if not exists idx_saved_research_articles_article on public.saved_research_articles using btree (research_article_id) tablespace pg_default;
create index if not exists idx_saved_research_articles_user on public.saved_research_articles using btree (user_id) tablespace pg_default;

-- Start with closed access. Add reviewed least-privilege policies before the app uses these tables.
alter table public.profiles enable row level security;
alter table public.author_profiles enable row level security;
alter table public.author_requests enable row level security;
alter table public.articles enable row level security;
alter table public.cms_content enable row level security;
alter table public.testimonials enable row level security;
alter table public.article_comments enable row level security;
alter table public.article_likes enable row level security;
alter table public.saved_articles enable row level security;
alter table public.doctor_followers enable row level security;
alter table public.doctor_follows enable row level security;
alter table public.notifications enable row level security;
alter table public.research_articles enable row level security;
alter table public.research_article_comments enable row level security;
alter table public.research_article_likes enable row level security;
alter table public.saved_research_articles enable row level security;
alter table public.review_comments enable row level security;
alter table public.analytics_events enable row level security;

commit;
