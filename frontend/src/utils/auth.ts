import { jwtDecode } from 'jwt-decode';

export function setToken(token: string) {
  localStorage.setItem("mosala_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("mosala_token");
}

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem('auth_token') || localStorage.getItem('mosala_token');
  } catch (e) {
    console.error('Error getting auth token:', e);
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem("mosala_token");
}

export function getUserRole(): string | null {
  // First try to get role from auth_user in localStorage (Supabase auth)
  try {
    const userJson = localStorage.getItem('auth_user');
    console.log('[getUserRole] auth_user from localStorage:', userJson);
    if (userJson) {
      const user = JSON.parse(userJson);
      console.log('[getUserRole] parsed user:', user);
      if (user.role) {
        console.log('[getUserRole] returning role from auth_user:', user.role);
        return user.role;
      }
    }
  } catch (e) {
    console.error('[getUserRole] error reading auth_user:', e);
  }

  // Fall back to JWT token decoding (backend auth)
  const token = getToken();
  console.log('[getUserRole] token from getToken():', token ? 'exists' : 'null');
  if (!token) {
    console.log('[getUserRole] no token found, returning null');
    return null;
  }
  try {
    const decoded = jwtDecode(token) as { role?: string; [key: string]: unknown };
    console.log('[getUserRole] decoded JWT:', decoded);
    const role = (decoded && (decoded.role as string)) || null;
    console.log('[getUserRole] returning role from JWT:', role);
    return role;
  } catch (e) {
    console.error('[getUserRole] error decoding JWT:', e);
    return null;
  }
}

export function isAuthenticated(): boolean {
  // Check if we have both token and user data
  const token = localStorage.getItem('auth_token') || getToken();
  const user = localStorage.getItem('auth_user');
  return !!(token && user);
}

export function logout() {
  removeToken();
  window.location.href = "/login?logout=1";
} 