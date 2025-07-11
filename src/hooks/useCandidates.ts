import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api/fetcher";

export function useCandidates() {
  return useQuery({
    queryKey: ["candidates"],
    queryFn: async () => fetchApi("/candidates")
  });
} 