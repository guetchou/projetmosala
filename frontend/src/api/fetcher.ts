import { API_BASE_URL } from "./config";
import { logout } from "@/utils/auth";

export async function fetchApi<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("mosala_token");
  const isDemo = localStorage.getItem("demoMode") === "true";
  const sandboxToken = localStorage.getItem("demoSandboxToken");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isDemo ? { "X-DEMO-MODE": "true" } : {}),
    ...(sandboxToken ? { "X-DEMO-SANDBOX": sandboxToken } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  const data = await res.json();
  if (data && data.demo) {
    if (typeof window !== "undefined") {
      alert(data.message || "Action simulée en mode DÉMO. Aucune donnée réelle modifiée.");
    }
  }
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
      errorMsg = (data as { message?: string }).message || errorMsg;
    } catch {
      // Ignore les erreurs de parsing JSON
    }
    throw new Error(errorMsg);
  }
  return data;
} 