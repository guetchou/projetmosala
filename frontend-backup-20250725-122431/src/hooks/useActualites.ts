import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api/fetcher";
import { API_BASE_URL } from "@/api/config";

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
      // Strapi v4/v5: /actualites?populate=*
      const res = await fetchApi<{ data: ActualiteStrapi[] }>("/actualites?populate=*");
      return res.data;
    }
  });
} 