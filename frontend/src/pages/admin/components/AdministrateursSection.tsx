import { useEffect, useState } from 'react';
import { Plus, X, CheckCircle } from 'lucide-react';
import { adminsAPI, type Admin } from '@/api/admins';
import { supabase } from '@/lib/supabase';
import AdminTable from './AdminTable';
import AdminForm from './AdminForm';

export default function AdministrateursSection() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPendingOnly, setShowPendingOnly] = useState(true);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      // Récupérer tous les administrateurs (admin, admin_content et superadmin)
      const { data, error: err } = await supabase
        .from('profiles')
        .select('id, full_name, email, role, is_active, created_at, updated_at')
        .in('role', ['admin', 'admin_content', 'superadmin'])
        .order('created_at', { ascending: false });

      if (err) {
        console.error('Error fetching profiles:', err.message, err.hint);
        setError('Aucun administrateur trouvé dans la base de données');
        setAdmins([]);
      } else {
        console.log('Liste des administrateurs (admin + admin_content) récupérée:', data);
        const transformedAdmins = (data || []).map((raw: any): Admin => ({
          id: raw.id,
          full_name: raw.full_name || 'Sans nom',
          email: raw.email || '',
          role: raw.role || 'admin',
          is_active: raw.is_active !== undefined ? raw.is_active : true,
          created_at: raw.created_at,
          updated_at: raw.updated_at,
        }));
        setAdmins(transformedAdmins);
      }
    } catch (err) {
      setError('Aucun administrateur trouvé dans la base de données');
      console.error(err);
      setAdmins([]);
    }
    setLoading(false);
  };

  const handleAddAdmin = async (data: {
    nom: string;
    email: string;
    password?: string;
    role: 'admin_content' | 'admin' | 'superadmin';
  }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (editingAdmin) {
        const result = await adminsAPI.update(editingAdmin.id, {
          full_name: data.nom,
          email: data.email,
          role: data.role,
        } as any);
        if (result) {
          setAdmins(admins.map((a) => (a.id === editingAdmin.id ? result : a)));
          setSuccessMessage('Administrateur mis à jour avec succès!');
          setEditingAdmin(null);
        }
      } else {
        const result = await adminsAPI.create(data);
        if (result) {
          setAdmins([...admins, result]);
          setSuccessMessage('Administrateur créé avec succès!');
        }
      }
      setFormOpen(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Erreur lors de l\'enregistrement de l\'administrateur');
      console.error(err);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet administrateur ?')) {
      try {
        const success = await adminsAPI.delete(id);
        if (success) {
          setAdmins(admins.filter((a) => a.id !== id));
          setSuccessMessage('Administrateur supprimé avec succès!');
          setTimeout(() => setSuccessMessage(null), 3000);
        }
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const handleToggleActive = async (admin: Admin) => {
    try {
      const result = await adminsAPI.toggleActive(admin.id, !admin.is_active);
      if (result) {
        setAdmins(admins.map((a) => (a.id === admin.id ? result : a)));
        setSuccessMessage(result.is_active ? 'Administrateur activé!' : 'Administrateur désactivé!');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      setError('Erreur lors de la modification du statut');
      console.error(err);
    }
  };

  const handleApprove = async (adminId: string) => {
    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .update({ is_active: true })
        .eq('id', adminId)
        .select('*')
        .single();

      if (err) {
        console.error('Failed to approve admin:', err.message, err.hint);
        setError('Erreur lors de l\'approbation de l\'administrateur');
        return;
      }

      if (data) {
        const approvedAdmin: Admin = {
          id: data.id,
          full_name: data.full_name || 'Sans nom',
          email: data.email || '',
          role: data.role || 'admin',
          is_active: data.is_active !== undefined ? data.is_active : true,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
        setAdmins(admins.map((a) => (a.id === adminId ? approvedAdmin : a)));
        setSuccessMessage('Administrateur approuvé avec succès!');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      setError('Erreur lors de l\'approbation de l\'administrateur');
      console.error(err);
    }
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingAdmin(null);
  };

  // Filtrer les admins en attente si showPendingOnly est actif
  const displayedAdmins = showPendingOnly ? admins.filter(a => !a.is_active) : admins;
  const pendingCount = admins.filter(a => !a.is_active).length;

  return (
    <div className="space-y-6">
      {error && admins.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)}>
            <X size={20} />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="bg-[#e8f5e9] border border-[#00A651] text-[#00672F] px-4 py-3 rounded-lg flex justify-between items-center">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)}>
            <X size={20} />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <button
          onClick={() => {
            setEditingAdmin(null);
            setFormOpen(!formOpen);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A651] text-white rounded-lg font-semibold hover:bg-[#00672F] transition"
        >
          <Plus size={20} /> Ajouter un administrateur
        </button>

        {pendingCount > 0 && (
          <button
            onClick={() => setShowPendingOnly(!showPendingOnly)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              showPendingOnly
                ? 'bg-[#c8e6c9] text-[#00672F] hover:bg-[#a5d6a7]'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {pendingCount} administrateur{pendingCount > 1 ? 's' : ''} en attente
          </button>
        )}
      </div>

      {formOpen && (
        <AdminForm
          onSubmit={handleAddAdmin}
          isLoading={isSubmitting}
          initialData={editingAdmin || undefined}
          onCancel={handleCloseForm}
        />
      )}

      {loading ? (
        <div className="text-center text-gray-600 py-8">Chargement des administrateurs...</div>
      ) : displayedAdmins.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          {admins.length === 0 
            ? 'Aucun administrateur trouvé dans la base de données' 
            : 'Aucun administrateur en attente de validation'}
        </div>
      ) : (
        <div className="space-y-4">
          {displayedAdmins.map((admin) => (
            <div
              key={admin.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{admin.full_name}</h3>
                <p className="text-sm text-gray-600">{admin.email}</p>
                <div className="mt-2 flex gap-2">
                  <span className="inline-block px-3 py-1 bg-[#e8f5e9] text-[#00A651] rounded-full text-xs font-semibold">
                    {admin.role}
                  </span>
                  {!admin.is_active && (
                    <span className="inline-block px-3 py-1 bg-[#FFE8CC] text-[#FFA500] rounded-full text-xs font-semibold">
                      En attente de validation
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {!admin.is_active && (
                  <button
                    onClick={() => handleApprove(admin.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#00A651] text-white rounded-lg font-semibold hover:bg-[#00672F] transition"
                  >
                    <CheckCircle size={16} /> Approuver
                  </button>
                )}
                <button
                  onClick={() => handleEdit(admin)}
                  className="px-4 py-2 bg-[#00A651] text-white rounded-lg font-semibold hover:bg-[#00672F] transition"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showPendingOnly && admins.length > 0 && (
        <AdminTable
          admins={displayedAdmins}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onToggleActive={handleToggleActive}
        />
      )}
    </div>
  );
}
