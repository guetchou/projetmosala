// Routes constants for the Mosala application
export const ROUTES = {
  // Public routes
  HOME: '/',
  SERVICES: '/services',
  FORMATIONS: '/formations',
  CANDIDATES: '/candidates',
  JOBS: '/jobs',
  BLOG: '/blog',
  CONTACT: '/contact',
  ABOUT: '/about',
  SUPPORT: '/support',
  
  // Authentication routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Dashboard routes
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_JOBS: '/admin/jobs',
  
  // Recruiter routes
  RECRUITER_DASHBOARD: '/recruiter',
  RECRUITER_APPLICATIONS: '/recruiter/applications',
  
  // Candidate routes
  CANDIDATE_DASHBOARD: '/candidate',
  CANDIDATE_APPLICATIONS: '/candidate/applications',
  
  // Legal routes
  PRIVACY: '/privacy',
  TERMS: '/terms',
  LEGAL: '/legal',
  FAQ: '/faq',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey]; 