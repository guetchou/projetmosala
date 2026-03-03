import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { Actualite } from '@/api/actualites';

interface ActualiteCardProps {
  actualite: Actualite;
  onDelete: (id: number) => void;
  onToggleALaUne: (id: number) => void;
  onEdit?: (actualite: Actualite) => void;
}

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
};

// Helper to get excerpt or fallback to first 100 chars of contenu
const getExcerpt = (excerpt?: string, contenu?: string): string => {
  if (excerpt && excerpt.trim()) return excerpt;
  if (contenu) return contenu.substring(0, 100) + (contenu.length > 100 ? '...' : '');
  return '';
};

export default function ActualiteCard({
  actualite,
  onDelete,
  onToggleALaUne,
  onEdit,
}: ActualiteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-[#FFA500] hover:shadow-lg transition">
      {actualite.imageUrl && (
        <div className="w-full h-40 bg-gray-200 overflow-hidden">
          <img
            src={actualite.imageUrl}
            alt={actualite.titre}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-gray-900">{actualite.titre}</h4>
          {actualite.aLaUne && (
            <span className="bg-[#FFA500] text-white text-xs px-2 py-1 rounded">
              À la une
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-3">{getExcerpt(actualite.excerpt, actualite.contenu)}</p>
        {actualite.date && (
          <p className="text-xs text-gray-500 mb-3">📅 {formatDate(actualite.date)}</p>
        )}
        <div className="flex gap-2 text-sm flex-wrap">
          <button
            onClick={() => onToggleALaUne(actualite.id)}
            className="text-[#FFA500] hover:text-[#FF8C00] font-medium"
          >
            ★ À la une
          </button>
          {actualite.lien && (
            <a
              href={actualite.lien}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#00A651] hover:text-[#00672F] font-medium"
            >
              <ExternalLink size={16} /> Lien
            </a>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(actualite)}
              className="flex items-center gap-1 text-[#00A651] hover:text-[#00672F] font-medium"
            >
              <Edit size={16} /> Modifier
            </button>
          )}
          <button
            onClick={() => onDelete(actualite.id)}
            className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium"
          >
            <Trash2 size={16} /> Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
