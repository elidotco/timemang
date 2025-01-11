import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const url = "https://tajgjaaccxzypcbpvcet.supabase.co";

const supabaseKey = process.env.SUPABASE_KEY;

if (!url || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided.");
}

// Create Supabase client
export const supabase = createClient(url, supabaseKey);
