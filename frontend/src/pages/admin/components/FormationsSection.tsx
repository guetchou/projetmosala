import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, X, Edit, Trash2 } from 'lucide-react';
import { formationsAPI as sbFormationsAPI, type Formation } from '@/api/formations';
import FormationForm from './FormationForm';
import { categoriesAPI } from '@/api/categories';

export default function FormationsSection() {
  const { user } = useAuth();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Only load if user is defined
    if (!user) {
      setLoading(false);
      return;
    }
    
    loadFormations();
    loadCategories();
  }, [user]);

  const loadCategories = async () => {
    try {
      const cats = await categoriesAPI.getAll();
      // attach to state so FormationsSection can pass to form
      setLocalCategories(cats);
    } catch (err) {
      console.error('Error loading categories', err);
    }
  };

  const [localCategories, setLocalCategories] = useState<{ id: string; nom: string }[]>([]);

  const loadFormations = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Formation[] = [];
      data = await sbFormationsAPI.getAll();
      setFormations(data);
    } catch (err) {
      setError('Erreur lors du chargement des formations');
      console.error(err);
    }
    setLoading(false);
  };

  const handleAddFormation = async (data: {
    titre: string;
    contenu: string;
    imageUrl?: string;
    date?: string;
    categoryId?: string | null;
  }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Use Supabase client for create/update
      if (editingFormation) {
        const payload: any = { titre: data.titre, contenu: data.contenu, imageUrl: data.imageUrl, date: data.date };
        if (data.categoryId !== undefined) payload.category_id = data.categoryId;
        const result = await sbFormationsAPI.update(editingFormation.id, payload);
        if (result) {
          setFormations(formations.map((f) => (f.id === editingFormation.id ? result : f)));
          setSuccessMessage('Formation mise à jour avec succès!');
          setEditingFormation(null);
        }
      } else {
        const payload: any = { titre: data.titre, contenu: data.contenu, imageUrl: data.imageUrl, date: data.date };
        if (data.categoryId !== undefined) payload.categoryId = data.categoryId;
        const result = await sbFormationsAPI.create(payload);
        if (result) {
          setFormations([...formations, result]);
          setSuccessMessage('Formation créée avec succès!');
        }
      }
      setFormOpen(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Erreur lors de l\'enregistrement de la formation');
      console.error(err);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        const success = await sbFormationsAPI.delete(id);
        if (success) {
          setFormations(formations.filter((f) => f.id !== id));
          setSuccessMessage('Formation supprimée avec succès!');
          setTimeout(() => setSuccessMessage(null), 3000);
        }
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const handleEdit = (formation: Formation) => {
    setEditingFormation(formation);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingFormation(null);
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

      {successMessage && (
        <div className="bg-[#e8f5e9] border border-[#00A651] text-[#00672F] px-3 md:px-4 py-2 md:py-3 rounded-lg flex justify-between items-center text-sm md:text-base">
          <span className="min-w-0 pr-2">{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="flex-shrink-0">
            <X size={20} />
          </button>
        </div>
      )}

      <button
        onClick={() => {
          setEditingFormation(null);
          setFormOpen(!formOpen);
        }}
        className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-[#00A651] text-white rounded-lg font-semibold hover:bg-[#00672F] transition text-sm md:text-base whitespace-nowrap"
      >
        <Plus size={18} /> {editingFormation ? 'Modifier' : 'Ajouter'} une formation
      </button>

      {formOpen && (
        <FormationForm
          onSubmit={handleAddFormation}
          isLoading={isSubmitting}
          initialData={editingFormation || undefined}
          onCancel={handleCloseForm}
          categories={localCategories}
        />
      )}

      {loading ? (
        <div className="text-center text-gray-600 py-8 text-sm md:text-base">Chargement des formations...</div>
      ) : formations.length === 0 ? (
        <div className="text-center text-gray-600 py-8 text-sm md:text-base">Aucune formation disponible. Créez-en une!</div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date création</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formations.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-2 md:py-4 font-medium text-gray-900 truncate max-w-xs">{f.titre}</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-gray-500 whitespace-nowrap text-xs md:text-sm">{f.created_at ? new Date(f.created_at).toLocaleString('fr-FR', {year: '2-digit', month: '2-digit', day: '2-digit'}) : '-'}</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-gray-500">
                    <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                      <button
                        onClick={() => handleEdit(f)}
                        className="inline-flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 bg-[#00A651] text-white text-xs md:text-sm rounded hover:bg-[#00672F]"
                        aria-label={`Modifier ${f.titre}`}
                      >
                        <Edit size={14} /> <span className="hidden sm:inline">Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="inline-flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 bg-red-600 text-white text-xs md:text-sm rounded hover:bg-red-700"
                        aria-label={`Supprimer ${f.titre}`}
                      >
                        <Trash2 size={14} /> <span className="hidden sm:inline">Supprimer</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
