import os
import shutil

JOBS_PAGE = "src/pages/Jobs.tsx"
JOBS_HOOK = "src/hooks/useJobs.ts"
API_URL = os.environ.get("MOSALA_API_JOBS_URL", "https://api.mosala.org/jobs")  # à adapter

def backup_file(path):
    if os.path.exists(path):
        shutil.copy(path, path + ".bak")

def create_use_jobs_hook():
    os.makedirs("src/hooks", exist_ok=True)
    with open(JOBS_HOOK, "w", encoding="utf-8") as f:
        f.write(f'''
import {{ useQuery }} from "@tanstack/react-query";

export function useJobs(token) {{
  return useQuery({{
    queryKey: ["jobs"],
    queryFn: async () => {{
      const res = await fetch("{API_URL}", {{
        headers: token ? {{ "Authorization": `Bearer ${{token}}` }} : {{}}
      }});
      if (!res.ok) throw new Error("Erreur lors du chargement des offres");
      return res.json();
    }}
  }});
}}
''')

def patch_jobs_page():
    backup_file(JOBS_PAGE)
    with open(JOBS_PAGE, "w", encoding="utf-8") as f:
        f.write("""
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useJobs } from "@/hooks/useJobs";

// Si besoin d'un token d'authentification, le récupérer ici (localStorage, context, etc.)
const token = localStorage.getItem("mosala_token") || undefined;

const cities = ["Toutes", "Brazzaville", "Pointe-Noire", "Dolisie"];

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Toutes");
  const { data: jobs, isLoading, isError } = useJobs(token);

  const filteredJobs = jobs?.filter(job =>
    (city === "Toutes" || job.city === city) &&
    (job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase()))
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-mosala-light to-white flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-mosala-dark">Offres d'emploi</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Rechercher un poste, une entreprise..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="md:w-1/2"
          />
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="md:w-1/4">
              <SelectValue placeholder="Ville" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {isLoading && <div className="text-center py-12">Chargement des offres...</div>}
        {isError && <div className="text-center text-red-600 py-12">Erreur lors du chargement des offres.</div>}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredJobs.length === 0 && !isLoading && !isError ? (
            <div className="col-span-2 text-center text-muted-foreground py-12">Aucune offre trouvée.</div>
          ) : (
            filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg border border-border flex flex-col md:flex-row items-center p-6 gap-4">
                <img src={job.logo || '/images-mosala/placeholder.png'} alt={job.company} className="h-16 w-16 object-contain rounded-lg bg-gray-50 border" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-mosala-dark">{job.title}</h2>
                    <Badge className="bg-mosala-green/10 text-mosala-green">{job.type}</Badge>
                  </div>
                  <div className="text-muted-foreground">{job.company} • {job.city}</div>
                </div>
                <Button className="bg-mosala-green text-white">Voir l'offre</Button>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
""")

if __name__ == "__main__":
    create_use_jobs_hook()
    patch_jobs_page()
    print("Connexion à la vraie API pour les offres d'emploi automatisée ! (backup .bak créé)")
