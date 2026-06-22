import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://wspjhbzybxzgfulsyogi.supabase.co";

const supabaseKey =
  "ここにSupabaseのPublishable keyを貼る";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);