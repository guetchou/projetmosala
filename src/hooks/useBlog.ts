import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api/fetcher";

export function useBlog() {
  return useQuery({
    queryKey: ["blog"],
    queryFn: async () => fetchApi("/blog")
  });
} 