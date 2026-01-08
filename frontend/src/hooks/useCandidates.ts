import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api/fetcher";
import { Candidate } from "@/types/entities";

export function useCandidates() {
  return useQuery<Candidate[]>({
    queryKey: ["candidates"],
    queryFn: async () => fetchApi("/candidates")
  });
} 