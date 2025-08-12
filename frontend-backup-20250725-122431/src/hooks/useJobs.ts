
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/api/fetcher";

export function useJobs(token?: string) {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      return fetchApi("/jobs", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });
    }
  });
}
