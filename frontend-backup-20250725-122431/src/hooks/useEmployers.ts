import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api/fetcher";

export function useEmployers() {
  return useQuery({
    queryKey: ["employers"],
    queryFn: async () => fetchApi("/employers")
  });
} 