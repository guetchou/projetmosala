import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { inscriptionsAPI } from '@/api/inscriptions';
import { categoriesAPI, type Category } from '@/api/categories';

interface Inscription {
  id: number;
  nom: string;
  prenom: string;
  sexe: string;
  email: string;
  tel: string;
  ville: string;
  quartier: string;
  document_url?: string;
  formation_id: string;
  created_at?: never;
  date_inscription: string;
  formations?: {
    id: string;
    titre: string;
    category_id?: string;
  } | {
    id: string;
    titre: string;
    category_id?: string;
  }[];
}

export default function InscriptionsSection() {
  const { user } = useAuth();
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Only load if user is defined
    if (!user) {
      setLoading(false);
      return;
    }
    loadInscriptionsAndCategories();
  }, [user]);

  const loadInscriptionsAndCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      // Charger les catégories
      const cats = await categoriesAPI.getAll();
      setCategories(cats);

      // Charger les inscriptions
      const { data, error: fetchError } = await inscriptionsAPI.getAll();
      if (fetchError) {
        console.error('Error fetching inscriptions:', fetchError);
        setError('Erreur lors du chargement des inscriptions');
        setInscriptions([]);
      } else {
        setInscriptions(data || []);
      }
    } catch (err) {
      console.error('Error loading inscriptions:', err);
      setError('Erreur lors du chargement des données');
    }
    setLoading(false);
  };

  // Helper function to get formation info from inscription
  const getFormation = (inscription: Inscription) => {
    if (Array.isArray(inscription.formations)) {
      return inscription.formations[0];
    }
    return inscription.formations;
  };

  // Filtrer les inscriptions par catégorie
  const filteredInscriptions = selectedCategory
    ? inscriptions.filter(ins => {
        const formation = getFormation(ins);
        return formation?.category_id === selectedCategory;
      })
    : inscriptions;

  // Exporter en CSV
  const handleExportCSV = () => {
    if (filteredInscriptions.length === 0) {
      alert('Aucune donnée à exporter');
      return;
    }

    // Préparer les headers
    const headers = [
      'ID',
      'Nom',
      'Prénom',
      'Sexe',
      'Email',
      'Téléphone',
      'Ville',
      'Quartier',
      'Formation',
      'Catégorie',
      'Date inscription'
    ];

    // Préparer les lignes
    const rows = filteredInscriptions.map(ins => {
      const formation = getFormation(ins);
      return [
        ins.id,
        ins.nom,
        ins.prenom,
        ins.sexe,
        ins.email,
        ins.tel,
        ins.ville,
        ins.quartier,
        formation?.titre || 'N/A',
        categories.find(c => c.id === formation?.category_id)?.nom || 'N/A',
        new Date(ins.date_inscription).toLocaleDateString('fr-FR')
      ];
    });

    // Créer le CSV
    let csv = headers.map(h => `"${h}"`).join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell ?? ''}"`).join(',') + '\n';
    });

    // Télécharger
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `inscriptions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 md:px-4 py-2 md:py-3 rounded-lg flex justify-between items-center text-sm md:text-base">
          <span className="min-w-0 pr-2">{error}</span>
          <button onClick={() => setError(null)} className="flex-shrink-0">
            <X size={20} />
          </button>
        </div>
      )}

      {/* Filtres et actions */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-blue-500">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1 min-w-0">
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Filtrer par catégorie
            </label>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Toutes les catégories --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm md:text-base whitespace-nowrap order-first md:order-last w-full md:w-auto"
          >
            <Download size={18} /> <span className="hidden sm:inline">Exporter</span><span className="sm:hidden">CSV</span>
          </button>
        </div>

        <div className="mt-3 md:mt-4 text-xs md:text-sm text-gray-600">
          {filteredInscriptions.length} inscription{filteredInscriptions.length !== 1 ? 's' : ''} 
          {selectedCategory && ` (filtrée par catégorie)`}
        </div>
      </div>

      {/* Tableau des inscriptions */}
      {loading ? (
        <div className="text-center text-gray-600 py-8 text-sm md:text-base">Chargement des inscriptions...</div>
      ) : filteredInscriptions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600 text-sm md:text-base">
          Aucune inscription disponible{selectedCategory && ' pour cette catégorie'}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 text-xs md:text-sm lg:text-base">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Formation</th>
                <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Catégorie</th>
                <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Email</th>
                <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Tel</th>
                <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Ville</th>
                <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInscriptions.map((inscription) => {
                const formation = getFormation(inscription);
                return (
                <tr key={inscription.id} className="hover:bg-gray-50 transition">
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex flex-col">
                      <span className="truncate">{inscription.prenom}</span>
                      <span className="truncate text-xs text-gray-500">{inscription.nom}</span>
                    </div>
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-600 max-w-xs truncate">
                    {formation?.titre || 'N/A'}
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap hidden md:table-cell">
                    <span className="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {categories.find(c => c.id === formation?.category_id)?.nom || 'N/A'}
                    </span>
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap hidden lg:table-cell text-xs md:text-sm text-gray-600 truncate">
                    {inscription.email}
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap hidden lg:table-cell text-xs md:text-sm text-gray-600">
                    {inscription.tel}
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap hidden sm:table-cell text-xs md:text-sm text-gray-600">
                    {inscription.ville}
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {new Date(inscription.date_inscription).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
