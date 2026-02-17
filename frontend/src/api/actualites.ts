import { supabase } from '@/lib/supabase';

export interface Actualite {
  id: number;
  titre: string;
  excerpt: string;
  contenu: string;
  imageUrl?: string;
  lien?: string;
  aLaUne: boolean;
  date?: string;
  created_at?: string;
  updated_at?: string;
}

const transformActualite = (raw: any): Actualite => ({
  id: raw.id,
  titre: raw.titre,
  excerpt: raw.excerpt || '',
  contenu: raw.contenu || '',
  imageUrl: raw.image_url,
  lien: raw.link,
  aLaUne: raw.is_featured || false,
  date: raw.published_date || raw.created_at,
  created_at: raw.created_at,
  updated_at: raw.updated_at,
});

export const actualitesAPI = {
  // Récupérer toutes les actualités
  getAll: async (): Promise<Actualite[]> => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('id, titre, excerpt, contenu, image_url, link, is_featured, published_date, created_at, updated_at')
        .order('published_date', { ascending: false });

      if (error) {
        console.error('Error fetching actualites:', error);
        return [];
      }

      return (data || []).map(transformActualite);
    } catch (error) {
      console.error('Error fetching actualites:', error);
      return [];
    }
  },

  // Récupérer une actualité par ID
  getOne: async (id: number): Promise<Actualite | null> => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('id, titre, excerpt, contenu, image_url, link, is_featured, published_date, created_at, updated_at')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching actualite:', error);
        return null;
      }

      return data ? transformActualite(data) : null;
    } catch (error) {
      console.error('Error fetching actualite:', error);
      return null;
    }
  },

  // Créer une actualité
  create: async (actualite: {
    titre: string;
    excerpt: string;
    contenu: string;
    imageUrl?: string;
    lien?: string;
    aLaUne: boolean;
  }): Promise<Actualite | null> => {
    try {
      // Récupérer l'ID de l'auteur
      let author_id: number | null = null;
      try {
        const stored = localStorage.getItem('auth_user');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.id) author_id = typeof parsed.id === 'string' ? parseInt(parsed.id) : parsed.id;
        }
      } catch {}
      if (!author_id && supabase.auth && typeof supabase.auth.getUser === 'function') {
        try {
          const { data: userData } = await supabase.auth.getUser();
          if (userData?.user?.id) author_id = typeof userData.user.id === 'string' ? parseInt(userData.user.id) : userData.user.id;
        } catch {}
      }

      const { data, error } = await supabase
        .from('news')
        .insert([
          {
            titre: actualite.titre,
            excerpt: actualite.excerpt,
            contenu: actualite.contenu,
            image_url: actualite.imageUrl || null,
            link: actualite.lien || null,
            is_featured: actualite.aLaUne || false,
            published_date: new Date().toISOString(),
          },
        ])
        .select('id, titre, excerpt, contenu, image_url, link, is_featured, published_date, created_at, updated_at')
        .single();

      if (error) {
        console.error('Error creating actualite:', error);
        return null;
      }

      return transformActualite(data);
    } catch (error) {
      console.error('Error creating actualite:', error);
      return null;
    }
  },

  // Mettre à jour une actualité
  update: async (id: number, actualite: Partial<Actualite>): Promise<Actualite | null> => {
    try {
      const updateData: any = {};
      if (actualite.titre) updateData.titre = actualite.titre;
      if (actualite.excerpt !== undefined) updateData.excerpt = actualite.excerpt;
      if (actualite.contenu) updateData.contenu = actualite.contenu;
      if (actualite.imageUrl !== undefined) updateData.image_url = actualite.imageUrl || null;
      if (actualite.lien !== undefined) updateData.link = actualite.lien || null;
      if (actualite.aLaUne !== undefined) updateData.is_featured = actualite.aLaUne;

      const { data, error } = await supabase
        .from('news')
        .update(updateData)
        .eq('id', id)
        .select('id, titre, excerpt, contenu, image_url, link, is_featured, published_date, created_at, updated_at')
        .single();

      if (error) {
        console.error('Error updating actualite:', error);
        return null;
      }

      return transformActualite(data);
    } catch (error) {
      console.error('Error updating actualite:', error);
      return null;
    }
  },

  // Supprimer une actualité
  delete: async (id: number): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting actualite:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting actualite:', error);
      return false;
    }
  },
};

export default actualitesAPI;
