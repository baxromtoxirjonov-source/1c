-- Enable pg_trgm extension for fast full-text / trigram searching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 1. Enums
CREATE TYPE pricing_model_type AS ENUM ('free', 'freemium', 'subscription', 'one_time', 'custom');
CREATE TYPE deployment_type AS ENUM ('cloud', 'onprem', 'hybrid');

-- 2. Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_uz TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- 3. System Types table
CREATE TABLE IF NOT EXISTS system_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  abbr TEXT NOT NULL,
  full_name_en TEXT NOT NULL,
  description_uz TEXT NOT NULL,
  definition_uz TEXT NOT NULL,
  when_needed_uz TEXT NOT NULL,
  key_features JSONB NOT NULL DEFAULT '[]'::jsonb,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  icon TEXT,
  related_ids UUID[] DEFAULT '{}',
  faq JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 4. Platforms table
CREATE TABLE IF NOT EXISTS platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  description_uz TEXT NOT NULL,
  audience_uz TEXT NOT NULL,
  pricing_model pricing_model_type NOT NULL DEFAULT 'subscription',
  deployment deployment_type NOT NULL DEFAULT 'cloud',
  integrations JSONB NOT NULL DEFAULT '[]'::jsonb,
  local_support BOOLEAN NOT NULL DEFAULT false,
  website_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  system_type_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 5. Local Systems table
CREATE TABLE IF NOT EXISTS local_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description_uz TEXT NOT NULL,
  use_case_tags TEXT[] NOT NULL DEFAULT '{}',
  official_url TEXT,
  platform_type_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 6. Indexes for high performance
CREATE INDEX IF NOT EXISTS idx_system_types_slug ON system_types(slug);
CREATE INDEX IF NOT EXISTS idx_system_types_abbr_trgm ON system_types USING gin (abbr gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_system_types_desc_trgm ON system_types USING gin (description_uz gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_platforms_slug ON platforms(slug);
CREATE INDEX IF NOT EXISTS idx_platforms_name_trgm ON platforms USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_platforms_desc_trgm ON platforms USING gin (description_uz gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_local_systems_slug ON local_systems(slug);
CREATE INDEX IF NOT EXISTS idx_local_systems_name_trgm ON local_systems USING gin (name gin_trgm_ops);

-- 7. Row Level Security (RLS) - Public Read-Only
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_systems ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public categories are viewable by everyone" ON categories
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public system_types are viewable by everyone" ON system_types
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public platforms are viewable by everyone" ON platforms
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public local_systems are viewable by everyone" ON local_systems
  FOR SELECT TO anon, authenticated USING (true);

-- 8. Global search function RPC search_all
CREATE OR REPLACE FUNCTION search_all(q TEXT)
RETURNS TABLE (
  result_type TEXT,
  id UUID,
  slug TEXT,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  category TEXT
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'system_type'::TEXT AS result_type,
    st.id,
    st.slug,
    st.abbr AS title,
    st.full_name_en AS subtitle,
    st.description_uz AS description,
    COALESCE(c.name_uz, 'Boshqa') AS category
  FROM system_types st
  LEFT JOIN categories c ON st.category_id = c.id
  WHERE 
    st.abbr ILIKE '%' || q || '%' 
    OR st.full_name_en ILIKE '%' || q || '%' 
    OR st.description_uz ILIKE '%' || q || '%'
    OR st.definition_uz ILIKE '%' || q || '%'

  UNION ALL

  SELECT 
    'platform'::TEXT AS result_type,
    p.id,
    p.slug,
    p.name AS title,
    p.full_name AS subtitle,
    p.description_uz AS description,
    COALESCE(c.name_uz, 'Boshqa') AS category
  FROM platforms p
  LEFT JOIN categories c ON p.category_id = c.id
  WHERE 
    p.name ILIKE '%' || q || '%' 
    OR p.full_name ILIKE '%' || q || '%' 
    OR p.description_uz ILIKE '%' || q || '%'
    OR p.audience_uz ILIKE '%' || q || '%'

  UNION ALL

  SELECT 
    'local_system'::TEXT AS result_type,
    ls.id,
    ls.slug,
    ls.name AS title,
    'O‘zbekiston yechimi'::TEXT AS subtitle,
    ls.description_uz AS description,
    array_to_string(ls.use_case_tags, ', ') AS category
  FROM local_systems ls
  WHERE 
    ls.name ILIKE '%' || q || '%' 
    OR ls.description_uz ILIKE '%' || q || '%';
END;
$$;
