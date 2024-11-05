import { createClient } from "@supabase/supabase-js";

// dev mode
const NEXT_PUBLIC_SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL      //
const NEXT_PUBLIC_SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY





export const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
