import { useQuery } from "@tanstack/react-query";
import { fetchCms } from "@/api/cms";

export interface JobEntity {
  id: number | string;
  attributes: {
    titre: string;
    description?: string;
    entreprise?: string;
    lieu?: string;
    salaire?: string;
    date?: string;
    logo?: { data?: { attributes: { url: string } } };
  };
}

export function useJobs() {
  return useQuery<JobEntity[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetchCms<{ data: JobEntity[] }>(
        "/api/job-offers?sort[0]=date:desc&populate=*"
      );
      return res.data;
    },
  });
}

import { fetchApi } from "@/api/fetcher";

export function useJobsApi(token?: string) {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      return fetchApi("/jobs", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    },
  });
}
