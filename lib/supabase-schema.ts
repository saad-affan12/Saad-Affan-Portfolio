export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS portfolio_data (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- Allow anon read access (for public visitors counter etc.)
CREATE POLICY "anon_read" ON portfolio_data
  FOR SELECT TO anon
  USING (true);

-- Allow service role full access
CREATE POLICY "service_full" ON portfolio_data
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable Realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE portfolio_data;
`;
