import { supabase } from '@/lib/supabase';

export interface Formation {
  id: string;
  titre: string;
  contenu: string;
  imageUrl?: string;
  date?: string;
  created_at?: string;
  updated_at?: string;
  category_id?: string | null;
}

const transformFormation = (raw: any): Formation => ({
  id: raw.id,
  titre: raw.titre,
  contenu: raw.contenu || '',
  imageUrl: raw.image_url,
  date: raw.created_at,
  created_at: raw.created_at,
  updated_at: raw.updated_at,
  category_id: raw.category_id || null,
});

export const formationsAPI = {
  // Récupérer toutes les formations
  getAll: async (): Promise<Formation[]> => {
    try {
      const { data, error } = await supabase
        .from('formations')
        .select('id, titre, contenu, image_url, created_at, updated_at, category_id')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching formations:', error);
        return [];
      }

      return (data || []).map(transformFormation);
    } catch (error) {
      console.error('Error fetching formations:', error);
      return [];
    }
  },

  // Récupérer une formation par ID (string UUID)
  getOne: async (id: string): Promise<Formation | null> => {
    try {
      const { data, error } = await supabase
        .from('formations')
        .select('id, titre, contenu, image_url, created_at, updated_at')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching formation:', error);
        return null;
      }

      return data ? transformFormation(data) : null;
    } catch (error) {
      console.error('Error fetching formation:', error);
      return null;
    }
  },

  // Créer une formation
  create: async (formation: {
    titre: string;
    contenu: string;
    imageUrl?: string;
    date?: string;
    categoryId?: string | null;
  }): Promise<Formation | null> => {
    try {
      const { data, error } = await supabase
        .from('formations')
        .insert([
          {
            titre: formation.titre,
            contenu: formation.contenu || null,
            image_url: formation.imageUrl || null,
            category_id: formation.categoryId || null,
          },
        ])
        .select('id, titre, contenu, image_url, created_at, updated_at')
        .single();

      if (error) {
        console.error('Error creating formation:', error);
        return null;
      }

      return transformFormation(data);
    } catch (error) {
      console.error('Error creating formation:', error);
      return null;
    }
  },

  // Mettre à jour une formation
  update: async (id: string, formation: Partial<Formation>): Promise<Formation | null> => {
    try {
      const updateData: any = {};
      if (formation.titre) updateData.titre = formation.titre;
      if ((formation as any).contenu) {
        updateData.contenu = (formation as any).contenu;
      }
      if (formation.imageUrl !== undefined) updateData.image_url = formation.imageUrl || null;
        if ((formation as any).category_id !== undefined) updateData.category_id = (formation as any).category_id || null;

      const { data, error } = await supabase
        .from('formations')
        .update(updateData)
        .eq('id', id)
        .select('id, titre, contenu, image_url, created_at, updated_at, category_id')
        .single();

      if (error) {
        console.error('Error updating formation:', error);
        return null;
      }

      return transformFormation(data);
    } catch (error) {
      console.error('Error updating formation:', error);
      return null;
    }
  },

  // Supprimer une formation
  delete: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('formations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting formation:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting formation:', error);
      return false;
    }
  },
};

export default formationsAPI;
