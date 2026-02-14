import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Try to read vars from process.env first, otherwise from backend/.env
let url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
let key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if ((!url || !key) && process.cwd()) {
  // attempt to read backend/.env relative to repo root
  const backendEnv = path.resolve(process.cwd(), '..', 'backend', '.env');
  try {
    const content = fs.readFileSync(backendEnv, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)=(.*)$/);
      if (!m) continue;
      const k = m[1];
      let v = m[2] || '';
      // remove optional surrounding quotes
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (k === 'VITE_SUPABASE_URL') url = url || v;
      if (k === 'VITE_SUPABASE_ANON_KEY') key = key || v;
    }
  } catch (err) {
    // ignore if file missing
  }
}

if (!url || !key) {
  console.error('Supabase env vars not set. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY and rerun.');
  process.exit(2);
}

const supabase = createClient(url, key);

(async () => {
  try {
    const testEmail = `test_admin_${Date.now()}@example.com`;
    const password = 'Test1234!';
    console.log('Attempting signUp with', testEmail);
    const { data, error } = await supabase.auth.signUp({ email: testEmail, password });
    if (error) {
      console.error('SignUp error:', error.message);
      process.exit(1);
    }
    console.log('SignUp result:', JSON.stringify(data, null, 2));
    console.log('If email confirmations are enabled, check your Supabase project to confirm the user.');
  } catch (err) {
    console.error('Unexpected error', err);
    process.exit(1);
  }
})();
