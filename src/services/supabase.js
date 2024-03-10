import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://cazcsumbpijozdhlweyh.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhemNzdW1icGlqb3pkaGx3ZXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4ODk0OTcsImV4cCI6MjAyNTQ2NTQ5N30.j4B_qjygyddOfh0I9HRNfONrRY2QMwAIGfiQF81W0ls";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
