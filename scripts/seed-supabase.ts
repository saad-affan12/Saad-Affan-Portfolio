import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const KEYS = [
  "hero", "projects", "roadmap", "education",
  "skills", "socials", "settings", "seo", "cli",
] as const;

async function seed() {
  for (const key of KEYS) {
    const filePath = path.join(DATA_DIR, `${key}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skipping ${key}: file not found`);
      continue;
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const { error } = await supabase
      .from("portfolio_data")
      .upsert({ key, data, updated_at: new Date().toISOString() }, { onConflict: "key" });
    if (error) {
      console.error(`Error seeding ${key}:`, error.message);
    } else {
      console.log(`Seeded ${key}`);
    }
  }
  console.log("Done.");
}

seed().catch(console.error);
