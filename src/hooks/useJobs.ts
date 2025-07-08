
import { useQuery } from "@tanstack/react-query";

export function useJobs(token) {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch("https://api.mosala.org/jobs", {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des offres");
      return res.json();
    }
  });
}
