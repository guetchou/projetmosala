export const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || '';

export async function fetchCms<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
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
      if (data?.error?.message) {
        message = data.error.message;
      }
    } catch (parseError) {
      console.warn('Unable to parse CMS error response:', parseError);
    }

    throw new Error(message);
  }

  return res.json();
}
