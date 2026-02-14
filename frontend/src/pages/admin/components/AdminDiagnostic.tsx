// Fichier: frontend/src/pages/admin/components/AdminDiagnostic.tsx
// Usage: Utilisez ce composant pour diagnostiquer les problèmes de connexion Supabase

import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface DiagnosticResult {
  name: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: string;
}

const runTestsSequence = async (): Promise<DiagnosticResult[]> => {
  const newResults: DiagnosticResult[] = [];

  // Test 1: Vérifier la configuration Supabase
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (url && key) {
      newResults.push({
        name: 'Configuration Supabase',
        status: 'success',
        message: 'Variables d\'environnement configurées',
        details: `URL: ${url.substring(0, 30)}...`
      });
    } else {
      newResults.push({
        name: 'Configuration Supabase',
        status: 'error',
        message: 'Variables d\'environnement manquantes'
      });
    }
  } catch (err) {
    newResults.push({
      name: 'Configuration Supabase',
      status: 'error',
      message: `Erreur: ${err}`
    });
  }

  // Test 2: Vérifier l'authentification
  try {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      newResults.push({
        name: 'Authentification',
        status: 'success',
        message: 'Utilisateur authentifié',
        details: `Email: ${data.session.user.email}`
      });
    } else {
      newResults.push({
        name: 'Authentification',
        status: 'warning',
        message: 'Aucune session active'
      });
    }
  } catch (err) {
    newResults.push({
      name: 'Authentification',
      status: 'error',
      message: `Erreur: ${err}`
    });
  }

  // Test 3: Vérifier la connexion à la table profiles
  try {
    const { data, error, status, count } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true });

    if (error) {
      newResults.push({
        name: 'Accès à la table profiles',
        status: 'error',
        message: `Erreur ${status}: ${error.message}`,
        details: `${error.details || 'Vérifiez les RLS'}${error.hint ? ' — hint: ' + error.hint : ''}`
      });
    } else {
      newResults.push({
        name: 'Accès à la table profiles',
        status: 'success',
        message: 'Connexion réussie à la table profiles',
        details: `${count || 0} profils trouvés`
      });
    }
  } catch (err) {
    newResults.push({
      name: 'Accès à la table profiles',
      status: 'error',
      message: `Erreur: ${err}`
    });
  }

  // Test 4: Compter les administrateurs
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, role')
      .in('role', ['admin', 'admin_content', 'superadmin'])
      .limit(1000);

    if (error) {
      newResults.push({
        name: 'Comptage des administrateurs',
        status: 'error',
        message: `Erreur: ${error.message}`,
        details: error.hint ? `hint: ${error.hint}` : undefined
      });
    } else {
      const count = data?.length || 0;
      newResults.push({
        name: 'Comptage des administrateurs',
        status: count > 0 ? 'success' : 'warning',
        message: `${count} administrateur(s) trouvé(s)`,
        details: count === 0 ? 'Aucun admin dans la base de données' : ''
      });
    }
  } catch (err) {
    newResults.push({
      name: 'Comptage des administrateurs',
      status: 'error',
      message: `Erreur: ${err}`
    });
  }

  // Test 5: Récupérer les admins avec le filtre is_active
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, is_active')
      .eq('is_active', true)
      .in('role', ['admin', 'admin_content', 'superadmin'])
      .limit(5);

    if (error) {
      newResults.push({
        name: 'Récupération avec filtre is_active',
        status: 'error',
        message: `Erreur: ${error.message}`,
        details: `${error.hint ? 'hint: ' + error.hint : 'La colonne is_active ou role pourrait ne pas exister'}`
      });
    } else {
      const count = data?.length || 0;
      newResults.push({
        name: 'Récupération avec filtre is_active',
        status: count > 0 ? 'success' : 'warning',
        message: `${count} administrateur(s) actif(s) trouvé(s)`
      });
    }
  } catch (err) {
    newResults.push({
      name: 'Récupération avec filtre is_active',
      status: 'error',
      message: `Erreur: ${err}`
    });
  }

  // Test 6: Récupérer tous les administrateurs avec toutes les colonnes
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, is_active, created_at, updated_at')
      .in('role', ['admin', 'admin_content', 'superadmin'])
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      newResults.push({
        name: 'Récupération administrateurs complets',
        status: 'error',
        message: `Erreur: ${error.message}`,
        details: `${error.hint ? 'hint: ' + error.hint : 'Colonnes demandées : id, full_name, email, role, is_active, created_at'}`
      });
    } else {
      const count = data?.length || 0;
      newResults.push({
        name: 'Récupération administrateurs complets',
        status: count > 0 ? 'success' : 'warning',
        message: `${count} administrateur(s) trouvé(s)`,
        details: count === 0 ? 'Aucun admin' : '✅ Données présentes'
      });
    }
  } catch (err) {
    newResults.push({
      name: 'Récupération administrateurs complets',
      status: 'error',
      message: `Erreur: ${err}`
    });
  }

  return newResults;
};

export default function AdminDiagnostic() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [loading, setLoading] = useState(false);

  const runDiagnostics = async () => {
    setLoading(true);
    const newResults = await runTestsSequence();
    setResults(newResults);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const newResults = await runTestsSequence();
      if (mounted) {
        setResults(newResults);
        setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const getIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'error':
        return <XCircle className="text-red-600" size={20} />;
      case 'warning':
        return <AlertCircle className="text-yellow-600" size={20} />;
      default:
        return null;
    }
  };

  const getColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🔍 Diagnostic Supabase</h2>
        <button
          onClick={runDiagnostics}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          {loading ? 'En cours...' : 'Relancer le test'}
        </button>
      </div>

      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Chargement des diagnostics...
          </div>
        ) : (
          results.map((result, idx) => (
            <div
              key={idx}
              className={`border rounded-lg p-4 flex items-start gap-3 ${getColor(result.status)}`}
            >
              <div className="flex-shrink-0 mt-1">
                {getIcon(result.status)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{result.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{result.message}</p>
                {result.details && (
                  <p className="text-xs text-gray-600 mt-2">{result.details}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold text-gray-900 mb-3">📝 Recommandations:</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            {results.some(r => r.status === 'error') && (
              <>
                <li>❌ Il y a des erreurs à résoudre ci-dessus</li>
                <li>• Vérifiez que votre authentification est correcte</li>
                <li>• Vérifiez les RLS sur la table 'profiles' dans Supabase</li>
                <li>• Vérifiez que la colonne 'is_active' existe</li>
              </>
            )}
            {results.some(r => r.status === 'warning') && (
              <>
                <li>⚠️ Il y a des avertissements à considérer</li>
                <li>• Vérifiez votre authentification</li>
              </>
            )}
            {results.every(r => r.status === 'success') && (
              <li>✅ Tous les diagnostics sont passés!</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
