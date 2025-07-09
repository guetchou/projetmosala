import { jwtDecode } from "jwt-decode";

export function setToken(token: string) {
  localStorage.setItem("mosala_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("mosala_token");
}

export function removeToken() {
  localStorage.removeItem("mosala_token");
}

export function getUserRole(): string | null {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.role || null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
} 