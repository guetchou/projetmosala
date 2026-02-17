import { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function SupabaseFix() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleDisableRLS = async () => {
    setLoading(true);
    setStatus('');
    
    try {
      // This requires admin access - but let's try to identify the issue
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(1);

      if (error) {
        setStatus(`Erreur: ${error.message}\n\nCause probable: ${
          error.message.includes('permission denied') 
            ? 'RLS bloque l\'accès. Désactivez RLS sur la table users dans Supabase Console.'
            : error.message.includes('does not exist')
            ? 'La table users n\'existe pas'
            : 'Problème d\'authentification ou de configuration'
        }`);
      } else {
        setStatus(`✅ Accès réussi!\nDonnées trouvées: ${data?.length || 0} lignes`);
      }
    } catch (err) {
      setStatus(`Erreur: ${err}`);
    }
    
    setLoading(false);
  };

  const handleCheckAuthFlow = async () => {
    setLoading(true);
    setStatus('');

    try {
      // Check session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setStatus('⚠️ Pas de session authentifiée\n\nÉtapes:\n1. Vous devez vous connecter d\'abord\n2. Allez à la page Login\n3. Connectez-vous avec un compte Supabase');
        setLoading(false);
        return;
      }

      // Try to fetch with auth
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(10);

      if (error) {
        setStatus(`❌ Erreur d'accès même authentifié:\n${error.message}\n\nVérifiez les RLS sur la table users`);
      } else {
        setStatus(`✅ Authentification OK\n✅ Accès aux données OK\nDonnées: ${data?.length || 0} lignes`);
      }
    } catch (err) {
      setStatus(`Erreur: ${err}`);
    }

    setLoading(false);
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
      <h3 className="font-bold text-amber-900 mb-4">🔧 Correcteur Supabase</h3>
      
      <div className="space-y-3 mb-4">
        <p className="text-sm text-amber-800">
          Si vous voyez 0 données retournées, c'est probablement un problème de RLS ou d'authentification.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleCheckAuthFlow}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
        >
          {loading ? '⏳ Vérification...' : '✅ Vérifier Authentification'}
        </button>

        <button
          onClick={handleDisableRLS}
          disabled={loading}
          className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 text-sm font-medium"
        >
          {loading ? '⏳ Vérification...' : '🔓 Vérifier RLS'}
        </button>
      </div>

      {status && (
        <div className="mt-4 p-3 bg-white border border-amber-200 rounded text-sm whitespace-pre-wrap text-amber-900 font-mono">
          {status}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-amber-800">
        <p className="font-semibold mb-2">Étapes à faire dans Supabase Console:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Allez à "Authentication" → "Providers"</li>
          <li>Assurez-vous qu'une méthode d'auth est activée (Email/Password)</li>
          <li>Allez à "SQL Editor" et exécutez: <code className="bg-amber-100 px-1">SELECT * FROM users LIMIT 1;</code></li>
          <li>Si vous avez une erreur "permission denied", allez à Table Editor</li>
          <li>Cliquez sur la table "users" → "RLS" → Désactivez "Enable RLS" (temporairement pour tester)</li>
        </ol>
      </div>
    </div>
  );
}
