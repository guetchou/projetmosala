import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { actualitesAPI, Actualite } from '@/api/actualites';

interface NewsFormProps {
  onSuccess?: (news: Actualite) => void;
  editingNews?: Actualite | null;
  onCancel?: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ onSuccess, editingNews, onCancel }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState<Partial<Actualite>>({
    titre: '',
    excerpt: '',
    contenu: '',
    imageUrl: '',
    lien: '',
    aLaUne: false,
  });

  // Pré-remplir le formulaire en cas d'édition
  useEffect(() => {
    if (editingNews) {
      setFormData({
        titre: editingNews.titre,
        excerpt: editingNews.excerpt,
        contenu: editingNews.contenu,
        imageUrl: editingNews.imageUrl,
        lien: editingNews.lien,
        aLaUne: editingNews.aLaUne,
      });
      if (editingNews.imageUrl) {
        setImagePreview(editingNews.imageUrl);
      }
    }
  }, [editingNews]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setFormData({ ...formData, imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let savedNews;
      const data: Parameters<typeof actualitesAPI.create>[0] = {
        titre: formData.titre || '',
        excerpt: formData.excerpt || '',
        contenu: formData.contenu || '',
        imageUrl: formData.imageUrl,
        lien: formData.lien,
        aLaUne: formData.aLaUne || false,
      };

      if (editingNews?.id) {
        savedNews = await actualitesAPI.update(editingNews.id, data);
      } else {
        savedNews = await actualitesAPI.create(data);
      }

      // Réinitialiser le formulaire
      setFormData({
        titre: '',
        excerpt: '',
        contenu: '',
        imageUrl: '',
        lien: '',
        aLaUne: false,
      });
      setImagePreview('');

      if (onSuccess && savedNews) {
        onSuccess(savedNews);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      titre: '',
      excerpt: '',
      contenu: '',
      imageUrl: '',
      lien: '',
      aLaUne: false,
    });
    setImagePreview('');
    setError(null);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-mosala-orange-800 mb-6">
        {editingNews ? 'Modifier l\'actualité' : 'Ajouter une nouvelle actualité'}
      </h3>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Titre */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            placeholder="Ex: Nouvelle initiative de Mosala"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-mosala-orange-500 focus:border-transparent"
          />
        </div>

        {/* Extrait */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Extrait *</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            placeholder="Résumé court de l'actualité"
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-mosala-orange-500 focus:border-transparent"
          />
        </div>

        {/* Contenu détaillé */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Contenu détaillé *</label>
          <textarea
            name="contenu"
            value={formData.contenu}
            onChange={handleChange}
            required
            placeholder="Contenu complet de l'actualité"
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-mosala-orange-500 focus:border-transparent"
          />
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image de couverture</label>
          <div className="flex gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Aperçu"
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Lien */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Lien (optionnel)</label>
          <input
            type="url"
            name="lien"
            value={formData.lien || ''}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-mosala-orange-500 focus:border-transparent"
          />
        </div>

        {/* À la une */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="aLaUne"
              checked={formData.aLaUne || false}
              onChange={handleChange}
              className="w-4 h-4 rounded accent-mosala-orange-600"
            />
            <span className="text-sm font-medium text-gray-700">Mettre à la une</span>
          </label>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-gradient-to-r from-mosala-orange-500 to-mosala-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? 'Enregistrement...' : (editingNews ? 'Mettre à jour' : 'Créer l\'actualité')}
        </button>
      </div>
    </form>
  );
};

export default NewsForm;