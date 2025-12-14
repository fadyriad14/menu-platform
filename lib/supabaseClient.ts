// We import createClient from the Supabase library you just installed.
// This function makes a "Supabase client" that can talk to your Supabase project.
import { createClient } from "@supabase/supabase-js";

// These values come from your .env.local file.
// NEXT_PUBLIC_* means the values are allowed to be used in the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// We create ONE client instance and export it.
// Later, any page can import { supabase } and use it for:
// - login/signup
// - database calls
// - uploading PDFs (Supabase Storage)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
