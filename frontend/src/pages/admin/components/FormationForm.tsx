import { Formation } from '@/api/formations';
import { X } from 'lucide-react';
import { useState } from 'react';

interface FormationFormProps {
  onSubmit: (data: {
    titre: string;
    contenu: string;
    imageUrl?: string;
    date?: string;
    categoryId?: string | null;
  }) => Promise<void>;
  isLoading?: boolean;
  initialData?: Formation;
  onCancel?: () => void;
  categories?: { id: string; nom: string }[];
}

export default function FormationForm({ onSubmit, isLoading, initialData, onCancel, categories = [] }: FormationFormProps) {
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
    const contenu = formData.get('contenu') as string;
    const date = (formData.get('date') as string) || undefined;
    const file = formData.get('imageFile') as File;
    let imageUrl = initialData?.imageUrl;

    if (file && file.size > 0) {
      if (file.size > 2 * 1024 * 1024) {
        setFileError("Fichier trop volumineux (max 2MB).");
        setUploading(false);
        return;
      }
      // Upload to Supabase Storage
      try {
        const { supabase } = await import('@/lib/supabase');
        const cleanedName = cleanFileName(file.name);
        const filePath = `formations/${Date.now()}_${cleanedName}`;
        console.log('Uploading file to Supabase:', filePath);
        
        const { data, error } = await supabase.storage.from('formations').upload(filePath, file, { upsert: true });
        
        if (error) {
          console.error('Upload error:', error);
          throw error;
        }
        
        console.log('Upload successful:', data);
        const { publicUrl } = supabase.storage.from('formations').getPublicUrl(filePath).data;
        imageUrl = publicUrl;
      } catch (err: any) {
        const errMsg = err?.message || "Erreur lors de l'upload de l'image.";
        console.error('Upload failed:', errMsg);
        setFileError(errMsg);
        setUploading(false);
        return;
      }
    }
    if (titre.trim() && contenu.trim()) {
      const categoryId = (formData.get('category_id') as string) || undefined;
      await onSubmit({ titre, contenu, imageUrl, date, categoryId });
      if (!initialData && e.currentTarget instanceof HTMLFormElement) {
        e.currentTarget.reset();
      }
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 md:p-6 mb-6 border-l-4 border-blue-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-4">
        <h3 className="text-base md:text-lg font-bold">
          {initialData ? 'Modifier la formation' : 'Nouvelle formation'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 self-start md:self-auto"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Titre *
          </label>
          <input
            type="text"
            name="titre"
            placeholder="Titre de la formation"
            defaultValue={initialData?.titre}
            required
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Contenu
          </label>
          <textarea
            name="contenu"
            placeholder="Contenu de la formation"
            defaultValue={initialData?.contenu}
            required
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Image (JPG, PNG, WebP)
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="w-full px-3 md:px-4 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-500 mt-1 block">Max : 2MB. Formats : JPG, PNG, WebP.</span>
            {fileError && <span className="text-xs text-red-500 mt-1 block">{fileError}</span>}
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              name="date"
              defaultValue={initialData?.date ? initialData.date.split('T')[0] : ''}
              required
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <select name="category_id" defaultValue={(initialData as any)?.category_id || ''} className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">-- Aucune --</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.nom}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row gap-2 pt-2">
          <button
            type="submit"
            disabled={isLoading || uploading}
            className="flex-1 px-4 md:px-6 py-2 text-sm md:text-base bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isLoading || uploading)
              ? 'Téléchargement...'
              : initialData
              ? 'Mettre à jour'
              : 'Créer'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 md:px-6 py-2 text-sm md:text-base bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Annuler
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
