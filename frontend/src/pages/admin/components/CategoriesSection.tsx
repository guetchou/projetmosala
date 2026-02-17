import { useEffect, useState } from 'react';
import { Plus, X, Edit, Trash2 } from 'lucide-react';
import { categoriesAPI, type Category } from '@/api/categories';

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriesAPI.getAll();
      setCategories(data);
    } catch (err) {
      setError('Erreur lors du chargement des catégories');
      console.error(err);
    }
    setLoading(false);
  };

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!inputValue.trim()) {
      setError('Le nom de la catégorie ne peut pas être vide');
      setIsSubmitting(false);
      return;
    }

    try {
      if (editingCategory) {
        // Si la modification n'est pas supportée, on peut la créer quand même
        // Pour l'instant, on supprime l'ancienne et on crée une nouvelle
        await categoriesAPI.delete(editingCategory.id);
        const result = await categoriesAPI.create(inputValue.trim());
        if (result) {
          setCategories(categories.map((c) => (c.id === editingCategory.id ? result : c)));
          setSuccessMessage('Catégorie mise à jour avec succès!');
          setEditingCategory(null);
        }
      } else {
        const result = await categoriesAPI.create(inputValue.trim());
        if (result) {
          setCategories([...categories, result]);
          setSuccessMessage('Catégorie créée avec succès!');
        }
      }
      setFormOpen(false);
      setInputValue('');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Erreur lors de l\'enregistrement de la catégorie');
      console.error(err);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        const success = await categoriesAPI.delete(id);
        if (success) {
          setCategories(categories.filter((c) => c.id !== id));
          setSuccessMessage('Catégorie supprimée avec succès!');
          setTimeout(() => setSuccessMessage(null), 3000);
        }
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setInputValue(category.nom);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingCategory(null);
    setInputValue('');
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
        <div className="bg-green-50 border border-green-200 text-green-700 px-3 md:px-4 py-2 md:py-3 rounded-lg flex justify-between items-center text-sm md:text-base">
          <span className="min-w-0 pr-2">{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="flex-shrink-0">
            <X size={20} />
          </button>
        </div>
      )}

      <button
        onClick={() => {
          setEditingCategory(null);
          setInputValue('');
          setFormOpen(!formOpen);
        }}
        className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm md:text-base whitespace-nowrap"
      >
        <Plus size={18} /> {editingCategory ? 'Modifier' : 'Ajouter'} une catégorie
      </button>

      {formOpen && (
        <form onSubmit={handleAddCategory} className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base md:text-lg font-bold">
              {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
            </h3>
            <button
              type="button"
              onClick={handleCloseForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Nom de la catégorie *
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ex: Technologie, Management..."
                required
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 md:px-6 py-2 text-sm md:text-base bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Enregistrement...' : editingCategory ? 'Mettre à jour' : 'Créer'}
              </button>
              <button
                type="button"
                onClick={handleCloseForm}
                className="px-4 md:px-6 py-2 text-sm md:text-base bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center text-gray-600 py-8 text-sm md:text-base">Chargement des catégories...</div>
      ) : categories.length === 0 ? (
        <div className="text-center text-gray-600 py-8 text-sm md:text-base">Aucune catégorie disponible. Créez-en une!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500 hover:shadow-lg transition">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 break-words">{category.nom}</h3>
              <p className="text-xs md:text-sm text-gray-500 mb-4">
                Créée le {category.created_at ? new Date(category.created_at).toLocaleDateString('fr-FR') : '-'}
              </p>
              <div className="flex gap-2 flex-col sm:flex-row">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 md:px-3 py-1.5 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs md:text-sm font-medium transition"
                  aria-label={`Modifier ${category.nom}`}
                >
                  <Edit size={14} /> Modifier
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 md:px-3 py-1.5 md:py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs md:text-sm font-medium transition"
                  aria-label={`Supprimer ${category.nom}`}
                >
                  <Trash2 size={14} /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
