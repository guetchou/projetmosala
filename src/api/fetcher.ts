import { API_BASE_URL } from "./config";
import { logout } from "@/utils/auth";

export async function fetchApi<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("mosala_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      // Session expirée ou non autorisée
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("mosala_token");
        window.location.href = "/login?expired=1";
      }
      throw new Error("Session expirée. Veuillez vous reconnecter.");
    }
    let errorMsg = `Erreur API: ${res.status}`;
    try {
      const data = await res.json();
      errorMsg = (data as { message?: string }).message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }
  return res.json();
} 