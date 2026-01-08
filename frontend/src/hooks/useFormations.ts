import { useQuery } from "@tanstack/react-query";
import { fetchCms } from "@/api/cms";

export interface FormationEntity {
  id: number | string;
  attributes: {
    titre: string;
    description?: string;
    image?: { data?: { attributes: { url: string } } };
    date?: string;
    lieu?: string;
    prix?: string | number;
  };
}

export function useFormations() {
  return useQuery<FormationEntity[]>({
    queryKey: ["formations"],
    queryFn: async () => {
      const res = await fetchCms<{ data: FormationEntity[] }>(
        "/api/formations?sort[0]=date:desc&populate=image"
      );
      return res.data;
    },
  });
}


