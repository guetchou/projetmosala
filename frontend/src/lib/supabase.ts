import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not configured in environment variables');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: true,
    storage: window.localStorage,
    storageKey: 'auth_token',
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    // 🛠️ SOLUTION AU ABORT ERROR : 
    // On intercepte les échecs de fetch pour empêcher l'application de crasher 
    // si le navigateur annule une requête trop rapide.
    fetch: async (url, options) => {
      try {
        return await fetch(url, options);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.warn('[Supabase] Requête annulée (Abort) interceptée proprement.');
          // On renvoie une réponse vide "neutre" au lieu de propager l'erreur
          return new Response(JSON.stringify({ data: null, error: null }), { status: 204 });
        }
        throw err;
      }
    },
  },
});

console.log('[supabase.ts] Supabase client initialized with Abort protection');

export default supabase;