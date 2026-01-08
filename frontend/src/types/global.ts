// Types globaux pour l'application Mosala

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'recruteur' | 'candidat';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'interview';
  coverLetter?: string;
  resume?: string;
  appliedAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage?: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  views: number;
  likes: number;
}

export interface Formation {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  instructor: string;
  price: number;
  currency: string;
  image: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  type: 'institution' | 'company' | 'ngo';
  priority: 'featured' | 'high' | 'medium' | 'low';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface SearchResult {
  type: 'job' | 'formation' | 'blog' | 'user';
  id: string;
  title: string;
  description: string;
  url: string;
  score: number;
}

// Types pour les props de composants
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: React.ReactNode;
}

// Types pour les hooks
export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface UseSearchReturn {
  query: string;
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  clear: () => void;
}

// Types pour les API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Types pour les filtres
export interface JobFilters {
  location?: string;
  type?: string;
  category?: string;
  salary?: {
    min: number;
    max: number;
  };
  remote?: boolean;
}

export interface FormationFilters {
  level?: string;
  category?: string;
  price?: {
    min: number;
    max: number;
  };
  duration?: string;
}

// Types pour les statistiques
export interface DashboardStats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  totalFormations: number;
  activeJobs: number;
  pendingApplications: number;
  completedFormations: number;
}

// Types pour les graphiques
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
} 