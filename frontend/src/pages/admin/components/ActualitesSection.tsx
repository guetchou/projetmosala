import { useEffect, useState } from 'react';
import { Plus, X, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { actualitesAPI, type Actualite } from '@/api/actualites';
import ActualiteForm from './ActualiteForm';

export default function ActualitesSection() {
  const { user } = useAuth();
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingActualite, setEditingActualite] = useState<Actualite | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Only load if user is defined
    if (!user) {
      setLoading(false);
      return;
    }
    loadActualites();
  }, [user]);

  const loadActualites = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Actualite[] = [];
      data = await actualitesAPI.getAll();

      setActualites(data);
    } catch (err) {
      setError('Erreur lors du chargement des actualités');
      console.error(err);
    }
    setLoading(false);
  };

  const handleAddActualite = async (data: {
    titre: string;
    excerpt: string;
    contenu: string;
    imageUrl?: string;
    lien?: string;
    aLaUne: boolean;
    date?: string;
  }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Use Supabase client for create/update to avoid backend connectivity issues
      if (editingActualite) {
        const result = await actualitesAPI.update(editingActualite.id, data);
        if (result) {
          setActualites(actualites.map((a) => (a.id === editingActualite.id ? result : a)));
          setSuccessMessage('Actualité mise à jour avec succès!');
          setEditingActualite(null);
        }
      } else {
        const result = await actualitesAPI.create(data);
        if (result) {
          setActualites([...actualites, result]);
          setSuccessMessage('Actualité créée avec succès!');
        }
      }
      setFormOpen(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Erreur lors de l\'enregistrement de l\'actualité');
      console.error(err);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      try {
        const success = await actualitesAPI.delete(id);
        if (success) {
          setActualites(actualites.filter((a) => a.id !== id));
          setSuccessMessage('Actualité supprimée avec succès!');
          setTimeout(() => setSuccessMessage(null), 3000);
        }
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const handleToggleALaUne = async (id: number) => {
    try {
      const actualite = actualites.find((a) => a.id === id);
      if (!actualite) return;

      const updated = await actualitesAPI.update(id, {
        ...actualite,
        aLaUne: !actualite.aLaUne,
      });

      if (updated) {
        setActualites(
          actualites.map((a) => (a.id === id ? { ...a, aLaUne: !a.aLaUne } : a))
        );
        setSuccessMessage(
          actualite.aLaUne ? 'Retiré de la une' : 'Mis en avant avec succès!'
        );
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour');
      console.error(err);
    }
  };

  const handleEdit = (actualite: Actualite) => {
    setEditingActualite(actualite);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingActualite(null);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)}>
            <X size={20} />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex justify-between items-center">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)}>
            <X size={20} />
          </button>
        </div>
      )}

      <button
        onClick={() => {
          setEditingActualite(null);
          setFormOpen(!formOpen);
        }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
      >
        <Plus size={20} /> {editingActualite ? 'Modifier' : 'Ajouter'} une actualité
      </button>

      {formOpen && (
        <ActualiteForm
          onSubmit={handleAddActualite}
          isLoading={isSubmitting}
          initialData={editingActualite || undefined}
          onCancel={handleCloseForm}
        />
      )}

      {loading ? (
        <div className="text-center text-gray-600 py-8">Chargement des actualités...</div>
      ) : actualites.length === 0 ? (
        <div className="text-center text-gray-600 py-8">Aucune actualité disponible. Créez-en une!</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">À la une</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {actualites.map((a) => (
                <tr key={a.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{a.titre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.date || a.created_at ? new Date(a.date || a.created_at!).toLocaleString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.aLaUne ? 'Oui' : 'Non'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(a)}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        aria-label={`Modifier ${a.titre}`}
                      >
                        <Edit size={14} /> Modifier
                      </button>
                      <button
                        onClick={() => handleToggleALaUne(a.id)}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        aria-label={`Basculer la une ${a.titre}`}
                      >
                        À la une
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        aria-label={`Supprimer ${a.titre}`}
                      >
                        <Trash2 size={14} /> Supprimer
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
