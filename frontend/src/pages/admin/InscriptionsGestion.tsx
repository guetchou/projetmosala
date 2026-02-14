import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { inscriptionsAPI } from "@/api/inscriptions";
import { formationsAPI } from "@/api/formations";
import { categoriesAPI } from "@/api/categories";

interface Inscription {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  ville: string;
  quartier: string;
  sexe: string;
  document_url?: string;
  formation_id: string;
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

export default function InscriptionsGestion() {
  const { user } = useAuth();
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ formationId: '', sexe: '', date: '', categoryId: '' });
  const [categories, setCategories] = useState<any[]>([]);
  const [formations, setFormations] = useState<any[]>([]);
  const [selected, setSelected] = useState<Inscription | null>(null);
  const [csvUrl, setCsvUrl] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    // Only load if user is defined
    if (!user) {
      setLoading(false);
      return;
    }
    loadAllData();
  }, [user]);

  async function loadAllData() {
    setLoading(true);
    try {
      const [inscriptionsData, formationsData, categoriesData] = await Promise.all([
        inscriptionsAPI.getAll(filters),
        formationsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      
      setInscriptions(inscriptionsData.data || []);
      setFormations(formationsData || []);
      setCategories(categoriesData || []);
    } catch (err) {
      console.error('Error loading data:', err);
      setInscriptions([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (filters.formationId || filters.sexe || filters.date || filters.categoryId) {
      loadAllData();
    }
  }, [filters]);

  function getFormationTitle(inscription: Inscription) {
    if (Array.isArray(inscription.formations)) {
      return inscription.formations[0]?.titre || 'N/A';
    }
    return inscription.formations?.titre || 'N/A';
  }

  function getFormationCategory(inscription: Inscription) {
    let categoryId: string | undefined;
    if (Array.isArray(inscription.formations)) {
      categoryId = inscription.formations[0]?.category_id;
    } else {
      categoryId = inscription.formations?.category_id;
    }
    return categories.find(c => c.id === categoryId)?.nom || 'N/A';
  }

  function handleExport() {
    if (filteredInscriptions.length === 0) {
      alert('Aucune donnée à exporter');
      return;
    }

    const headers = ['ID', 'Nom', 'Prénom', 'Sexe', 'Email', 'Téléphone', 'Ville', 'Quartier', 'Formation', 'Catégorie', 'Date'];
    const rows = filteredInscriptions.map(i => [
      i.id,
      i.nom,
      i.prenom,
      i.sexe,
      i.email,
      i.tel,
      i.ville,
      i.quartier,
      getFormationTitle(i),
      getFormationCategory(i),
      new Date(i.date_inscription).toLocaleDateString('fr-FR')
    ]);
    
    let csv = headers.map(h => `"${h}"`).join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell ?? ''}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `inscriptions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const filteredInscriptions = inscriptions;
  const totalPages = Math.max(1, Math.ceil(filteredInscriptions.length / itemsPerPage));
  const paginatedInscriptions = filteredInscriptions.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Filtres</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Formation</label>
            <select 
              value={filters.formationId} 
              onChange={e => { setFilters(f => ({ ...f, formationId: e.target.value })); setPage(1); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes</option>
              {formations.map(f => <option key={f.id} value={f.id}>{f.titre}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
            <select 
              value={filters.categoryId} 
              onChange={e => { setFilters(f => ({ ...f, categoryId: e.target.value })); setPage(1); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sexe</label>
            <select 
              value={filters.sexe} 
              onChange={e => { setFilters(f => ({ ...f, sexe: e.target.value })); setPage(1); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tous</option>
              <option value="Masculin">Masculin</option>
              <option value="Féminin">Féminin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input 
              type="date" 
              value={filters.date} 
              onChange={e => { setFilters(f => ({ ...f, date: e.target.value })); setPage(1); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-end">
            <button 
              onClick={handleExport}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <Download size={18} /> Exporter CSV
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
          <div className="text-sm text-gray-600">Total des inscriptions</div>
          <div className="text-3xl font-bold text-blue-600">{filteredInscriptions.length}</div>
        </div>
      </div>

      {/* Tableau */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Chargement des inscriptions...</p>
        </div>
      ) : filteredInscriptions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 text-lg">Aucune inscription trouvée</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Prénom</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">Téléphone</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Formation</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">Catégorie</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ville</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedInscriptions.map(i => (
                  <tr key={i.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{i.nom}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{i.prenom}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">{i.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{i.tel}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{getFormationTitle(i)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {getFormationCategory(i)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{i.ville}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(i.date_inscription).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button 
                        onClick={() => setSelected(i)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Précédent
              </button>
              <div className="text-sm text-gray-600">
                Page {page} / {totalPages}
              </div>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal détails */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Détails de l'inscription</h3>
              <button 
                onClick={() => setSelected(null)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div><strong>Nom:</strong> {selected.nom}</div>
              <div><strong>Prénom:</strong> {selected.prenom}</div>
              <div><strong>Sexe:</strong> {selected.sexe}</div>
              <div><strong>Email:</strong> {selected.email}</div>
              <div><strong>Téléphone:</strong> {selected.tel}</div>
              <div><strong>Ville:</strong> {selected.ville}</div>
              <div><strong>Quartier:</strong> {selected.quartier}</div>
              <div><strong>Formation:</strong> {getFormationTitle(selected)}</div>
              <div><strong>Catégorie:</strong> {getFormationCategory(selected)}</div>
              <div><strong>Date d'inscription:</strong> {new Date(selected.date_inscription).toLocaleDateString('fr-FR')}</div>
            </div>
            <button 
              onClick={() => setSelected(null)}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
