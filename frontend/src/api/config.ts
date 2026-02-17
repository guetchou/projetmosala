// Centralisation de l'URL d'API
const rawUrl = import.meta.env.VITE_API_URL || "https://api.mosala.org";
// Le backend expose ses routes sous le préfixe global '/mosala-api'
export const API_BASE_URL = rawUrl.replace(/\/+$/, '') + '/mosala-api';