import { Edit, Trash2 } from 'lucide-react';
import { Formation } from '@/api/formations';

interface FormationCardProps {
  formation: Formation;
  onDelete: (id: number) => void;
  onEdit?: (formation: Formation) => void;
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

export default function FormationCard({
  formation,
  onDelete,
  onEdit,
}: FormationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-blue-500 hover:shadow-lg transition">
      {formation.imageUrl && (
        <div className="w-full h-40 bg-gray-200 overflow-hidden">
          <img
            src={formation.imageUrl}
            alt={formation.titre}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h4 className="font-bold text-gray-900 mb-2">{formation.titre}</h4>
        <p className="text-sm text-gray-600 mb-3">{formation.contenu}</p>
        {formation.date && (
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block mb-4">
            📅 {formatDate(formation.date)}
          </div>
        )}
        <div className="flex gap-2 text-sm">
          {onEdit && (
            <button
              onClick={() => onEdit(formation)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
            >
              <Edit size={16} /> Modifier
            </button>
          )}
          <button
            onClick={() => onDelete(formation.id)}
            className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium"
          >
            <Trash2 size={16} /> Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
