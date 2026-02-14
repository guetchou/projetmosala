// Centralisation de l'URL du CMS (Strapi) - DEPRECATED: Utiliser Supabase à la place
// STRAPI is deprecated for new content; keep ENV if set, otherwise leave empty to avoid hardcoded localhost.
export const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || "";

// Note: Les nouvelles données (formations, actualités) doivent utiliser Supabase
// et NOT Strapi. Ce fichier est conservé uniquement pour la compatibilité rétroactive.

export async function fetchCms<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  } as Record<string, string>;

  const res = await fetch(`${STRAPI_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let message = `Erreur CMS: ${res.status}`;
    try {
      const data = (await res.json()) as { error?: { message?: string } };
      if (data?.error?.message) message = data.error.message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}


