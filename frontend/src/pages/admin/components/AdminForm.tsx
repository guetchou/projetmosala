import { Admin } from '@/api/admins';
import { X } from 'lucide-react';

interface AdminFormProps {
  onSubmit: (data: {
    nom: string;
    email: string;
    password?: string;
    role: 'admin_content' | 'admin' | 'superadmin';
  }) => Promise<void>;
  isLoading?: boolean;
  initialData?: Admin;
  onCancel?: () => void;
}

export default function AdminForm({ onSubmit, isLoading, initialData, onCancel }: AdminFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      nom: formData.get('nom') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string | undefined,
      role: formData.get('role') as 'admin_content' | 'admin' | 'superadmin',
    };

    if (data.nom.trim() && data.email.trim()) {
      // For new admins, password is optional but recommended
      await onSubmit(data);
      if (!initialData && e.currentTarget instanceof HTMLFormElement) {
        e.currentTarget.reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6 border-l-4 border-green-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">
          {initialData ? 'Modifier l\'administrateur' : 'Nouvel administrateur'}
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
            Nom *
          </label>
          <input
            type="text"
            name="nom"
            placeholder="Nom complet"
            defaultValue={initialData?.full_name}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            placeholder="adresse@email.com"
            defaultValue={initialData?.email}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {!initialData && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe {initialData ? '' : '(optionnel - invite par email si vide)'}
            </label>
            <input
              type="password"
              name="password"
              placeholder="Définir le mot de passe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rôle *
          </label>
          <select
            name="role"
            defaultValue={initialData?.role || 'admin'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="admin">Admin</option>
            <option value="admin_content">Admin Contenu</option>
            <option value="superadmin" disabled>Super Admin (Géré par superadmin uniquement)</option>
          </select>
        </div>
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? initialData
                ? 'Mise à jour...'
                : 'Création...'
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
