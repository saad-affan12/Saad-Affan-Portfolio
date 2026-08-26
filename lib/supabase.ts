import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const fetchWithTimeout = (timeoutMs = 3000) => {
  return (url: RequestInfo | URL, options?: RequestInit) => {
    return fetch(url, {
      ...options,
      signal: AbortSignal.timeout(timeoutMs),
    });
  };
};

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        global: {
          fetch: fetchWithTimeout(3000),
        },
      })
    : null;

export const supabaseAdmin =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        global: {
          fetch: fetchWithTimeout(3000),
        },
      })
    : null;
