export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  author: string;
}

export interface Candidate {
  id: string;
  name: string;
  profession: string;
  city: string;
}

export interface Employer {
  id: string;
  name: string;
  sector: string;
  city: string;
} 