import { supabase } from "@/lib/supabase";

export const inscriptionsAPI = {
  async create(data: any) {
    // Garder formation_id comme string (UUID) - pas de conversion
    const { error } = await supabase.from("inscriptions").insert([
      {
        nom: data.nom,
        prenom: data.prenom,
        sexe: data.sexe,
        email: data.email,
        tel: data.tel,
        ville: data.ville,
        quartier: data.quartier,
        document_url: data.document_url,
        formation_id: data.formation_id, // Garder comme string UUID
        date_inscription: new Date().toISOString(),
      },
    ]);
    return { error };
  },
  async getAll(filters: { formationId?: string; sexe?: string; date?: string; categoryId?: string } = {}) {
    // Join with formations to get title and category
    let query = supabase
      .from("inscriptions")
      .select(
        `id, nom, prenom, sexe, email, tel, ville, quartier, document_url, formation_id, date_inscription, formations(id, titre, category_id)`
      )
      .order("date_inscription", { ascending: false });

    if (filters.formationId) query = query.eq("formation_id", filters.formationId);
    if (filters.sexe) query = query.eq("sexe", filters.sexe);
    if (filters.date) query = query.gte("date_inscription", filters.date);
    if (filters.categoryId) query = query.eq('formations.category_id', filters.categoryId);

    const { data, error } = await query;
    return { data, error };
  },
  async getById(id: number) {
    const { data, error } = await supabase
      .from("inscriptions")
      .select("id, nom, prenom, sexe, email, tel, ville, quartier, document_url, formation_id, date_inscription")
      .eq("id", id)
      .single();
    return { data, error };
  }
};
