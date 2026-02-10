import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';

interface News {
  id?: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  link?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
}

interface NewsFormProps {
  onSuccess?: (news: News) => void;
  editingNews?: News | null;
  onCancel?: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ onSuccess, editingNews, onCancel }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState<News>({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    link: '',
    isPublished: false,
    isFeatured: false,
  });

  // Pré-remplir le formulaire en cas d'édition
  useEffect(() => {
    if (editingNews) {
      setFormData(editingNews);
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
      const method = editingNews ? 'PATCH' : 'POST';
      const url = editingNews
        ? `${API_BASE_URL}/news/${editingNews.id}`
        : `${API_BASE_URL}/news`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la sauvegarde');
      }

      const savedNews = await response.json();
      
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        description: '',
        content: '',
        imageUrl: '',
        link: '',
        isPublished: false,
        isFeatured: false,
      });
      setImagePreview('');

      if (onSuccess) {
        onSuccess(savedNews);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {editingNews ? 'Modifier l\'actualité' : 'Créer une nouvelle actualité'}
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            {imagePreview && (
              <div className="w-24 h-24">
                <img
                  src={imagePreview}
                  alt="Aperçu"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Titre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Titre de l'actualité"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (courte) *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Description courte de l'actualité"
          />
        </div>

        {/* Contenu */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenu *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Contenu complet de l'actualité"
          />
        </div>

        {/* Lien vers l'article officiel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lien vers l'article officiel
          </label>
          <input
            type="url"
            name="link"
            value={formData.link || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="https://example.com/article"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isPublished"
              id="isPublished"
              checked={formData.isPublished || false}
              onChange={handleChange}
              className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <label htmlFor="isPublished" className="ml-2 text-sm font-medium text-gray-700">
              Publier maintenant
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeatured"
              checked={formData.isFeatured || false}
              onChange={handleChange}
              className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-400"
            />
            <label htmlFor="isFeatured" className="ml-2 text-sm font-medium text-gray-700">
              Mettre à la une (à la une)
            </label>
          </div>
        </div>

        {formData.isFeatured && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-sm">
            ⚠️ Une seule actualité peut être mise à la une. L'actualité précédente sera retirée.
          </div>
        )}

        {/* Boutons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'En cours...' : editingNews ? 'Mettre à jour' : 'Créer'}
          </button>

          {editingNews && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition"
            >
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
