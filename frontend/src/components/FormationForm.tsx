import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { formationsAPI, Formation } from '@/api/formations';

interface FormationFormProps {
  onSuccess?: (formation: Formation) => void;
  editingFormation?: Formation | null;
  onCancel?: () => void;
}

const FormationForm: React.FC<FormationFormProps> = ({ onSuccess, editingFormation, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState<Partial<Formation>>({
    titre: '',
    contenu: '',
    imageUrl: '',
  });

  // Pré-remplir le formulaire en cas d'édition
  useEffect(() => {
    if (editingFormation) {
      setFormData({
        titre: editingFormation.titre,
        contenu: editingFormation.contenu,
        imageUrl: editingFormation.imageUrl,
      });
      if (editingFormation.imageUrl) {
        setImagePreview(editingFormation.imageUrl);
      }
    }
  }, [editingFormation]);

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
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let savedFormation;
      const data: Parameters<typeof formationsAPI.create>[0] = {
        titre: formData.titre || '',
        contenu: formData.contenu || '',
        imageUrl: formData.imageUrl,
      };

      if (editingFormation?.id) {
        savedFormation = await formationsAPI.update(editingFormation.id, data);
      } else {
        savedFormation = await formationsAPI.create(data);
      }

      // Réinitialiser le formulaire
      setFormData({
        titre: '',
        contenu: '',
        imageUrl: '',
      });
      setImagePreview('');

      if (onSuccess && savedFormation) {
        onSuccess(savedFormation);
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
      contenu: '',
      imageUrl: '',
    });
    setImagePreview('');
    setError(null);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6 border-l-4 border-blue-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">
          {editingFormation ? 'Modifier la formation' : 'Nouvelle formation'}
        </h3>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Titre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre *
          </label>
          <input
            type="text"
            name="titre"
            placeholder="Titre de la formation"
            value={formData.titre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Contenu */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contenu *
          </label>
          <textarea
            name="contenu"
            placeholder="Contenu de la formation"
            value={formData.contenu}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL de l'image
          </label>
          <input
            type="url"
            name="imageUrl"
            placeholder="https://..."
            value={formData.imageUrl || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Aperçu"
              className="w-32 h-32 object-cover rounded-lg mt-2"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? editingFormation
                ? 'Mise à jour...'
                : 'Création...'
              : editingFormation
              ? 'Mettre à jour'
              : 'Créer'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Annuler
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormationForm;
