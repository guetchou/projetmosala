import { supabase } from '@/lib/supabase';

export interface Admin {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'admin_content' | 'superadmin';
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

const transformAdmin = (raw: any): Admin => ({
  id: raw.id,
  full_name: raw.full_name || 'Sans nom',
  email: raw.email || '',
  role: raw.role || 'admin',
  is_active: raw.is_active !== undefined ? raw.is_active : true,
  created_at: raw.created_at,
  updated_at: raw.updated_at,
});

export const adminsAPI = {
  // Récupérer tous les administrateurs
  getAll: async (): Promise<Admin[]> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, role, is_active, created_at, updated_at')
        .in('role', ['admin', 'admin_content', 'superadmin'])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching admins:', error.message, error.hint);
        return [];
      }

      return (data || []).map(transformAdmin);
    } catch (error) {
      console.error('Error fetching admins:', error);
      console.error('Catch error details:', error instanceof Error ? error.message : JSON.stringify(error));
      return [];
    }
  },

  // Créer un administrateur
  create: async (admin: {
    nom: string;
    email: string;
    password?: string;
    role: 'admin' | 'admin_content' | 'superadmin';
  }): Promise<Admin | null> => {
    try {
      // Check if user already exists in profiles
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', admin.email)
        .single();

      if (existingUser) {
        console.warn('User already exists');
        return null;
      }

      // If password is provided, call backend to create auth user
      if (admin.password) {
        try {
          const backendResponse = await fetch('/api/admins/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              full_name: admin.nom,
              email: admin.email,
              password: admin.password,
              role: admin.role,
            }),
          });

          if (!backendResponse.ok) {
            const errorData = await backendResponse.json();
            console.error('Backend error creating admin:', errorData);
            throw new Error(errorData.message || 'Failed to create admin');
          }

          const result = await backendResponse.json();
          return result.admin;
        } catch (backendError) {
          console.error('Error calling backend:', backendError);
          throw backendError;
        }
      }

      // If no password, just create profile and send invitation email
      const newId = crypto.randomUUID();

      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: newId,
            full_name: admin.nom,
            email: admin.email,
            role: admin.role,
            is_active: true,
          },
        ])
        .select('id, full_name, email, role, is_active, created_at, updated_at')
        .single();

      if (error) {
        console.error('Error creating admin profile:', error.message, error.hint);
        return null;
      }

      return transformAdmin(data);
    } catch (error) {
      console.error('Error creating admin:', error);
      return null;
    }
  },

  // Mettre à jour un administrateur
  update: async (id: string, admin: Partial<Admin>): Promise<Admin | null> => {
    try {
      const updateData: any = {};
      if (admin.full_name) updateData.full_name = admin.full_name;
      if (admin.email) updateData.email = admin.email;
      if (admin.role) updateData.role = admin.role;
      if (admin.is_active !== undefined) updateData.is_active = admin.is_active;

      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', id)
        .select('id, full_name, email, role, is_active, created_at, updated_at')
        .single();

      if (error) {
        console.error('Error updating admin:', error.message, error.hint);
        return null;
      }

      return transformAdmin(data);
    } catch (error) {
      console.error('Error updating admin:', error);
      return null;
    }
  },

  // Basculer le statut actif/inactif
  toggleActive: async (id: string, isActive: boolean): Promise<Admin | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ is_active: isActive })
        .eq('id', id)
        .select('id, full_name, email, role, is_active, created_at')
        .single();

      if (error) {
        console.error('Error toggling admin active status:', error.message, error.hint);
        return null;
      }

      return transformAdmin(data);
    } catch (error) {
      console.error('Error toggling admin active status:', error);
      return null;
    }
  },

  // Supprimer un administrateur
  delete: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting admin:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting admin:', error);
      return false;
    }
  },
};

export default adminsAPI;
