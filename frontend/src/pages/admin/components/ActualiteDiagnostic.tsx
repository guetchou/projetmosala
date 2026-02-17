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

  // Test 1: Configuration
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    if (url) {
      newResults.push({
        name: 'Configuration Supabase',
        status: 'success',
        message: 'Variables configurées'
      });
    } else {
      newResults.push({
        name: 'Configuration Supabase',
        status: 'error',
        message: 'Variables manquantes'
      });
    }
  } catch (err) {
    newResults.push({
      name: 'Configuration Supabase',
      status: 'error',
      message: `Erreur: ${err}`
    });
  }

  // Test 2: Authentification
  try {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      newResults.push({
        name: 'Authentification',
        status: 'success',
        message: `Connecté: ${data.session.user.email}`
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

  // Test 3: Accès table news
  try {
    const { data, error, status } = await supabase
      .from('news')
      .select('*')
      .limit(1);

    if (error) {
      newResults.push({
        name: 'Accès à news',
        status: 'error',
        message: `Erreur ${status}: ${error.message}`
      });
    } else {
      newResults.push({
        name: 'Accès à news',
        status: 'success',
        message: 'Connexion OK'
      });
    }
  } catch (err) {
    newResults.push({
      name: 'Accès à news',
      status: 'error',
      message: `Erreur: ${err}`
    });
  }

  // Test 4: Compter actualités
  try {
    const { data, error } = await supabase
      .from('news')
      .select('id');

    if (error) {
      newResults.push({
        name: 'Comptage actualités',
        status: 'error',
        message: `Erreur: ${error.message}`
      });
    } else {
      const count = data?.length || 0;
      newResults.push({
        name: 'Comptage actualités',
        status: count > 0 ? 'success' : 'warning',
        message: `${count} actualité(s) trouvée(s)`
      });
    }
  } catch (err) {
    newResults.push({
      name: 'Comptage actualités',
      status: 'error',
      message: `Erreur: ${err}`
    });
  }

  // Test 5: Récupérer actualités complètes
  try {
    const { data, error } = await supabase
      .from('news')
      .select('id, titre, contenu, image_url, link, published_date')
      .limit(10);

    if (error) {
      newResults.push({
        name: 'Récupération actualités',
        status: 'error',
        message: `Erreur: ${error.message}`
      });
    } else {
      const count = data?.length || 0;
      newResults.push({
        name: 'Récupération actualités',
        status: count > 0 ? 'success' : 'warning',
        message: `${count} actualité(s) récupérée(s)`
      });
    }
  } catch (err) {
    newResults.push({
      name: 'Récupération actualités',
      status: 'error',
      message: `Erreur: ${err}`
    });
  }

  // Test 6: Vérifier colonnes
  try {
    const { data, error } = await supabase
      .from('news')
      .select('image_url, link')
      .limit(1);

    if (error) {
      newResults.push({
        name: 'Colonnes (image_url, link)',
        status: 'error',
        message: `Erreur: ${error.message}`,
        details: 'Les colonnes pourraient ne pas exister'
      });
    } else {
      newResults.push({
        name: 'Colonnes (image_url, link)',
        status: 'success',
        message: 'Colonnes présentes'
      });
    }
  } catch (err) {
    newResults.push({
      name: 'Colonnes (image_url, link)',
      status: 'error',
      message: `Erreur: ${err}`
    });
  }

  return newResults;
};

export default function ActualiteDiagnostic() {
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
    </div>
  );
}
