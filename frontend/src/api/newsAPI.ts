import { API_BASE_URL } from '@/config';

export interface News {
  id?: number;
  title: string;
  content: string;
  imageUrl?: string;
  link?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  category?: string;
  authorId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const newsAPI = {
  // Récupérer toutes les actualités
  getAll: async (published?: boolean): Promise<News[]> => {
    try {
      const url = published !== undefined
        ? `${API_BASE_URL}/news?published=${published}`
        : `${API_BASE_URL}/news`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return Array.isArray(data) ? data : [];
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des actualités:', error);
      return [];
    }
  },

  // Récupérer une actualité par ID
  getOne: async (id: number): Promise<News | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'actualité:', error);
      return null;
    }
  },

  // Créer une actualité
  create: async (news: News, token: string): Promise<News | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(news),
      });

      if (response.ok) {
        return await response.json();
      }

      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    } catch (error) {
      console.error('Erreur lors de la création de l\'actualité:', error);
      throw error;
    }
  },

  // Mettre à jour une actualité
  update: async (id: number, news: Partial<News>, token: string): Promise<News | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(news),
      });

      if (response.ok) {
        return await response.json();
      }

      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'actualité:', error);
      throw error;
    }
  },

  // Supprimer une actualité
  delete: async (id: number, token: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'actualité:', error);
      return false;
    }
  },

  // Publier une actualité
  publish: async (id: number, token: string): Promise<News | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}/publish`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return await response.json();
      }

      throw new Error('Erreur lors de la publication');
    } catch (error) {
      console.error('Erreur lors de la publication de l\'actualité:', error);
      return null;
    }
  },

  // Dépublier une actualité
  unpublish: async (id: number, token: string): Promise<News | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}/unpublish`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return await response.json();
      }

      throw new Error('Erreur lors de la dépublication');
    } catch (error) {
      console.error('Erreur lors de la dépublication de l\'actualité:', error);
      return null;
    }
  },

  // Mettre à la une
  setFeatured: async (id: number, token: string): Promise<News | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}/set-featured`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return await response.json();
      }

      throw new Error('Erreur lors de la mise à la une');
    } catch (error) {
      console.error('Erreur lors de la mise à la une:', error);
      return null;
    }
  },

  // Retirer de la une
  unsetFeatured: async (id: number, token: string): Promise<News | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}/unset-featured`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return await response.json();
      }

      throw new Error('Erreur lors du retrait de la une');
    } catch (error) {
      console.error('Erreur lors du retrait de la une:', error);
      return null;
    }
  },

  // Récupérer l'actualité à la une
  getFeatured: async (): Promise<News | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/featured/latest`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'actualité à la une:', error);
      return null;
    }
  },

  // Récupérer les dernières actualités
  getLatest: async (limit: number = 3): Promise<News[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/latest/${limit}`);
      if (response.ok) {
        const data = await response.json();
        return Array.isArray(data) ? data : [];
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des dernières actualités:', error);
      return [];
    }
  },
};
