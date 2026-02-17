import { Actualite } from '@/api/actualites';
import { supabase } from '@/lib/supabase';
import { X } from 'lucide-react';
import { useState } from 'react';

interface ActualiteFormProps {
  onSubmit: (data: {
    titre: string;
    excerpt: string;
    contenu: string;
    imageUrl?: string;
    lien?: string;
    aLaUne: boolean;
    date?: string;
  }) => Promise<void>;
  isLoading?: boolean;
  initialData?: Actualite;
  onCancel?: () => void;
}

export default function ActualiteForm({ onSubmit, isLoading, initialData, onCancel }: ActualiteFormProps) {
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Fonction pour nettoyer les noms de fichiers
  const cleanFileName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '_')  // Remplace caractères spéciaux par _
      .replace(/_+/g, '_')  // Remplace multiples _ par un seul
      .substring(0, 200);  // Limite à 200 caractères
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFileError(null);
    setUploading(true);
    const formData = new FormData(e.currentTarget);
    const titre = formData.get('titre') as string;
    const excerpt = formData.get('excerpt') as string;
    const contenu = formData.get('contenu') as string;
    const lien = (formData.get('lien') as string) || undefined;
    const aLaUne = formData.get('aLaUne') === 'on';
    const date = (formData.get('date') as string) || undefined;
    const file = formData.get('imageFile') as File;
    let imageUrl = initialData?.imageUrl;
    if (file && file.size > 0) {
      if (file.size > 3 * 1024 * 1024) {
        setFileError("Fichier trop volumineux (max 3MB).");
        setUploading(false);
        return;
      }
      // Upload to Supabase Storage
      try {
        const cleanedName = cleanFileName(file.name);
        const filePath = `news/${Date.now()}_${cleanedName}`;
        console.log('Uploading file to Supabase:', filePath);

        const { data, error } = await supabase.storage.from('news').upload(filePath, file, { upsert: true });
        
        if (error) {
          console.error('Upload error:', error);
          throw error;
        }
        
        console.log('Upload successful:', data);
        const { publicUrl } = supabase.storage.from('news').getPublicUrl(filePath).data;
        imageUrl = publicUrl;
      } catch (err: any) {
        const errMsg = err?.message || "Erreur lors de l'upload de l'image.";
        console.error('Upload failed:', errMsg);
        setFileError(errMsg);
        setUploading(false);
        return;
      }
    }
    if (titre.trim() && excerpt.trim()) {
      await onSubmit({ titre, excerpt, contenu, imageUrl, lien, aLaUne, date });
      if (!initialData && e.currentTarget instanceof HTMLFormElement) {
        e.currentTarget.reset();
      }
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6 border-l-4 border-orange-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">
          {initialData ? 'Modifier l\'actualité' : 'Nouvelle actualité'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre *
          </label>
          <input
            type="text"
            name="titre"
            placeholder="Titre de l'actualité"
            defaultValue={initialData?.titre}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Extrait *
          </label>
          <input
            type="text"
            name="excerpt"
            placeholder="Résumé court de l'actualité"
            defaultValue={initialData?.excerpt}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contenu
          </label>
          <textarea
            name="contenu"
            placeholder="Contenu complet de l'actualité"
            defaultValue={initialData?.contenu}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={6}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image (JPG, PNG, WebP)
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-xs text-gray-500 mt-1 block">Max : 3MB. Formats : JPG, PNG, WebP.</span>
            {fileError && <span className="text-xs text-red-500 mt-1 block">{fileError}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lien (optionnel)
            </label>
            <input
              type="url"
              name="lien"
              placeholder="https://..."
              defaultValue={initialData?.lien}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            name="date"
            defaultValue={initialData?.date ? initialData.date.split('T')[0] : ''}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer bg-orange-50 p-3 rounded-lg">
          <input
            type="checkbox"
            name="aLaUne"
            defaultChecked={initialData?.aLaUne}
            className="w-4 h-4 rounded accent-orange-600"
          />
          <span className="text-sm font-medium">Mettre à la une</span>
        </label>
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isLoading || uploading}
            className="flex-1 px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isLoading || uploading)
              ? 'Téléchargement du fichier...'
              : initialData
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
}
