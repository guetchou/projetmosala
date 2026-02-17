import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StatCard from './StatCard';
import { formationsAPI, type Formation } from '@/api/formations';
import { actualitesAPI, type Actualite } from '@/api/actualites';
import { adminsAPI, type Admin } from '@/api/admins';

export default function DashboardSection() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    formations: 0,
    actualites: 0,
    administrateurs: 0,
    actualitesEnUne: 0,
    formationsParDomaine: {} as Record<string, number>,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only load stats if user is defined
    if (!user) {
      setLoading(false);
      return;
    }

    const loadStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const [formations, actualites, admins] = await Promise.all([
          formationsAPI.getAll(),
          actualitesAPI.getAll(),
          adminsAPI.getAll(),
        ]);

        // Calculer les statistiques
        const formationsByDomain = formations.reduce((acc: Record<string, number>, f: Formation) => {
          acc[f.domaine] = (acc[f.domaine] || 0) + 1;
          return acc;
        }, {});

        const actualitesEnUne = actualites.filter((a: Actualite) => a.aLaUne).length;

        setStats({
          formations: formations.length,
          actualites: actualites.length,
          administrateurs: admins.length,
          actualitesEnUne,
          formationsParDomaine: formationsByDomain,
        });
      } catch (err) {
        setError('Erreur lors du chargement des statistiques');
        console.error(err);
      }
      setLoading(false);
    };

    loadStats();
    // Rafraîchir les stats toutes les 30 secondes
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Formations"
          value={stats.formations}
          color="from-blue-500 to-blue-600"
          icon="📚"
        />
        <StatCard
          title="Actualités"
          value={stats.actualites}
          color="from-orange-500 to-orange-600"
          icon="📰"
        />
        <StatCard
          title="Administrateurs"
          value={stats.administrateurs}
          color="from-green-500 to-green-600"
          icon="👥"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Actualités en avant</h3>
          <div className="text-4xl font-bold text-orange-600">{stats.actualitesEnUne}</div>
          <p className="text-sm text-gray-600 mt-2">
            sur {stats.actualites} actualités
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Formations par domaine</h3>
          <div className="space-y-2">
            {Object.entries(stats.formationsParDomaine).length === 0 ? (
              <p className="text-sm text-gray-600">Aucune formation</p>
            ) : (
              Object.entries(stats.formationsParDomaine).map(([domain, count]) => (
                <div key={domain} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{domain || 'Sans domaine'}</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                    {count}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold mb-3 text-gray-900">ℹ️ Informations utiles</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✅ Les données se synchronisent automatiquement toutes les 30 secondes</li>
          <li>✅ Vous pouvez créer, modifier et supprimer formations, actualités et administrateurs</li>
          <li>✅ Les actualités peuvent être mises en avant pour l'affichage à la une</li>
          <li>✅ Tous les administrateurs peuvent voir et gérer le contenu</li>
        </ul>
      </div>
    </div>
  );
}
