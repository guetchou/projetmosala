import { useQuery } from "@tanstack/react-query";
import { fetchCms } from "@/api/cms";

export interface ActualiteStrapi {
  id: string | number;
  attributes: {
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    image?: { data?: { attributes: { url: string } } };
    category?: string;
    author?: string;
  };
}

export function useActualites() {
  return useQuery<ActualiteStrapi[]>({
    queryKey: ["actualites"],
    queryFn: async () => {
      // Strapi v4/v5: /api/actualites?populate=*
      const res = await fetchCms<{ data: ActualiteStrapi[] }>("/api/actualites?populate=*");
      return res.data;
    }
  });
} 