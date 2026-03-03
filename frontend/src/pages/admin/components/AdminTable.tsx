import { Trash2, Edit, Lock, Unlock } from 'lucide-react';
import { Admin } from '@/api/admins';

interface AdminTableProps {
  admins: Admin[];
  onDelete: (id: string) => void;
  onEdit?: (admin: Admin) => void;
  onToggleActive?: (admin: Admin) => void;
}

export default function AdminTable({ admins, onDelete, onEdit, onToggleActive }: AdminTableProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-[#FFE8E8] text-[#ED1C24]';
      case 'admin_content':
        return 'bg-[#e8f5e9] text-[#00A651]';
      case 'admin':
        return 'bg-[#FFE8CC] text-[#FFA500]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    return role === 'admin_content' ? 'Admin Contenu' : role === 'superadmin' ? 'Super Admin' : 'Admin';
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Rôle
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Statut
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Date de création
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {admins.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                Aucun administrateur
              </td>
            </tr>
          ) : (
            admins.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{a.full_name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{a.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(a.role)}`}>
                    {getRoleLabel(a.role)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${a.is_active ? 'bg-[#e8f5e9] text-[#00A651]' : 'bg-red-100 text-red-800'}`}>
                    {a.is_active ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {a.created_at ? new Date(a.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2 flex-wrap">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(a)}
                        className="flex items-center gap-1 text-[#00A651] hover:text-[#00672F] font-medium transition"
                      >
                        <Edit size={16} /> Modifier
                      </button>
                    )}
                    {onToggleActive && (
                      <button
                        onClick={() => onToggleActive(a)}
                        className={`flex items-center gap-1 font-medium transition ${
                          a.is_active ? 'text-[#FFA500] hover:text-[#FF8C00]' : 'text-[#00A651] hover:text-[#00672F]'
                        }`}
                      >
                        {a.is_active ? (
                          <>
                            <Lock size={16} /> Bloquer
                          </>
                        ) : (
                          <>
                            <Unlock size={16} /> Débloquer
                          </>
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(a.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium transition"
                    >
                      <Trash2 size={16} /> Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
