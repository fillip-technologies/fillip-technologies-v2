-- Raw SQL schema. Run with `npm run db:migrate`.
-- Safe to run repeatedly (uses IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT,
  company     TEXT,
  message     TEXT        NOT NULL,
  source      TEXT,                      -- e.g. which page/form the lead came from
  status      TEXT        NOT NULL DEFAULT 'new',  -- new | contacted | closed
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx     ON leads (status);

-- Admin users for the dashboard (auth wired up in a later step).
CREATE TABLE IF NOT EXISTS admin_users (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT        NOT NULL UNIQUE,
  password_hash  TEXT        NOT NULL,
  name           TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- CMS content: one row per editable section, payload stored as JSON.
-- e.g. key = 'home.hero', data = { "eyebrow": "...", "headingLine1": "..." }
CREATE TABLE IF NOT EXISTS site_content (
  key         TEXT PRIMARY KEY,
  data        JSONB       NOT NULL DEFAULT '{}'::jsonb,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Registry of /industries/<slug> pages. Admins create these from the CMS;
-- each row's section content lives in site_content under `industry.<slug>.<id>`.
-- `published` gates public visibility (drafts are preview-only for admins).
CREATE TABLE IF NOT EXISTS industries (
  slug        TEXT PRIMARY KEY,
  label       TEXT        NOT NULL,
  published   BOOLEAN     NOT NULL DEFAULT false,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS industries_sort_idx ON industries (sort_order, slug);

-- Seed the original 6 industries (published) so existing URLs keep working
-- after the move from static route folders to the dynamic /industries/[slug].
INSERT INTO industries (slug, label, published, sort_order) VALUES
  ('healthcare',  'Healthcare',  true, 1),
  ('finance',     'Finance',     true, 2),
  ('retail',      'Retail',      true, 3),
  ('education',   'Education',   true, 4),
  ('real-estate', 'Real Estate', true, 5),
  ('logistics',   'Logistics',   true, 6)
ON CONFLICT (slug) DO NOTHING;
