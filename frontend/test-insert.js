const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

function loadEnv(envPath) {
  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split(/\r?\n/);
  const env = {};
  for (const l of lines) {
    const line = l.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.substring(0, idx).trim();
    const val = line.substring(idx + 1).trim();
    env[key] = val;
  }
  return env;
}

(async () => {
  try {
    const env = loadEnv('./.env');
    const supabaseUrl = env.VITE_SUPABASE_URL;
    const anonKey = env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in frontend/.env');
      process.exit(1);
    }

    const supabase = createClient(supabaseUrl, anonKey);

    console.log('== Test: sign in with test admin credentials ==');
    const email = 'admin@test.com';
    const password = 'temp_password_123';

    const { data: signData, error: signErr } = await supabase.auth.signInWithPassword({ email, password });
    if (signErr) {
      console.error('Sign-in error:', signErr.message || signErr);
    } else {
      console.log('Sign-in success, session:', !!signData?.session);
    }

    const accessToken = signData?.session?.access_token || null;
    if (!accessToken) {
      console.error('No access token obtained; aborting tests.');
      process.exit(1);
    }

    // Create a client that will use the access token by setting auth header
    const authed = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    });

    console.log('\n== Test insert into news ==');
    const newsItem = { titre: 'Test auto', contenu: 'Contenu test automatique', image_url: null, link: null, is_featured: false };
    const { data: newsData, error: newsErr } = await authed.from('news').insert([newsItem]).select().single();
    if (newsErr) {
      console.error('News insert error:', newsErr);
    } else {
      console.log('News inserted:', newsData);
    }

    console.log('\n== Test insert into formations_advanced ==');
    const formationItem = { titre: 'Formation auto', description: 'Desc test automatique', contenu: 'Contenu', image_url: null, published_date: new Date().toISOString() };
    const { data: formData, error: formErr } = await authed.from('formations_advanced').insert([formationItem]).select().single();
    if (formErr) {
      console.error('Formation insert error:', formErr);
    } else {
      console.log('Formation inserted:', formData);
    }

    process.exit(0);
  } catch (e) {
    console.error('Unexpected error:', e);
    process.exit(1);
  }
})();
