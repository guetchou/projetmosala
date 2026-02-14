import { API_BASE_URL } from '@/config';

export interface Formation {
  id?: number;
  title: string;
  content: string;
  imageUrl?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  duration?: number;
  maxParticipants?: number;
  price?: number;
  prerequisites?: string;
  status?: 'draft' | 'published' | 'archived';
  authorId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const formationsAPI = {
  // Récupérer toutes les formations
  getAll: async (status?: string): Promise<Formation[]> => {
    try {
      const url = status
        ? `${API_BASE_URL}/formations-advanced?status=${status}`
        : `${API_BASE_URL}/formations-advanced`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return Array.isArray(data) ? data : [];
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des formations:', error);
      return [];
    }
  },

  // Récupérer une formation par ID
  getOne: async (id: number): Promise<Formation | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/formations-advanced/${id}`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la formation:', error);
      return null;
    }
  },

  // Créer une formation
  create: async (formation: Formation, token: string): Promise<Formation | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/formations-advanced`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formation),
      });

      if (response.ok) {
        return await response.json();
      }
      
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    } catch (error) {
      console.error('Erreur lors de la création de la formation:', error);
      throw error;
    }
  },

  // Mettre à jour une formation
  update: async (id: number, formation: Partial<Formation>, token: string): Promise<Formation | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/formations-advanced/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formation),
      });

      if (response.ok) {
        return await response.json();
      }

      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la formation:', error);
      throw error;
    }
  },

  // Supprimer une formation
  delete: async (id: number, token: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/formations-advanced/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation:', error);
      return false;
    }
  },

  // Publier une formation
  publish: async (id: number, token: string): Promise<Formation | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/formations-advanced/${id}/publish`, {
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
      console.error('Erreur lors de la publication:', error);
      return null;
    }
  },
};
