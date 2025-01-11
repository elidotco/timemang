import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const url = "https://tajgjaaccxzypcbpvcet.supabase.co";

export const supabase = createClient(url, process.env.SUPABSE_KEY!);
