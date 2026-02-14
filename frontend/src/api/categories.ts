import { supabase } from '@/lib/supabase';

export interface Category {
  id: string;
  nom: string;
  created_at?: string;
}

export const categoriesAPI = {
  async getAll(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, nom, created_at')
        .order('nom', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        return [];
      }

      return (data || []) as Category[];
    } catch (err) {
      console.error('Error fetching categories:', err);
      return [];
    }
  },

  async create(nom: string) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ nom }])
        .select('id, nom, created_at')
        .single();
      if (error) {
        console.error('Error creating category:', error);
        return null;
      }
      return data as Category;
    } catch (err) {
      console.error('Error creating category:', err);
      return null;
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) {
        console.error('Error deleting category:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error deleting category:', err);
      return false;
    }
  }
};

export default categoriesAPI;
