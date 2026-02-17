import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not configured in environment variables');
}

// Ensure a single Supabase client instance across module reloads / HMR
declare global {
  interface Window {
    __MOSALA_SUPABASE_INSTANCE__?: any;
  }
}

if (!globalThis.window) {
  // server environment fallback
}

const createSupabaseClient = () => createClient(supabaseUrl || '', supabaseAnonKey || '', {
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
        if (err && (err.name === 'AbortError' || err.code === 'ABORT_ERR')) {
          console.warn('[Supabase] Requête annulée (Abort) interceptée — renvoi de l\'erreur pour debug.');
          // Pour le debug, on renvoie l'erreur afin que l'appelant voie la raison réelle
          throw err;
        }
        throw err;
      }
    },
  },
});

const existing = (typeof window !== 'undefined' && (window as any).__MOSALA_SUPABASE_INSTANCE__);
export const supabase = existing || (typeof window !== 'undefined' ? ((window as any).__MOSALA_SUPABASE_INSTANCE__ = createSupabaseClient()) : createSupabaseClient());

console.log('[supabase.ts] Supabase client initialized (singleton)');

export default supabase;