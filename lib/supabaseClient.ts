
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lqnbjfrpjhrlfqdfdpse.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxbmJqZnJwamhybGZxZGZkcHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4Nzg0NzIsImV4cCI6MjA4MzQ1NDQ3Mn0.-Yqm-IPd_4cpHGESvoNySuMFoMaO11x6JVB90fAgIco';

export const supabase = createClient(supabaseUrl, supabaseKey);
