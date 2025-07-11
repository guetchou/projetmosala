
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import { MapPin, Briefcase, Clock, Search } from "lucide-react";
import Loader from "@/components/ui/Loader";

const JobCard = ({ job }) => (
  <Card className="mb-6 bg-[var(--color-mosala-white)]/90 border-[var(--color-mosala-dark-100)] shadow-lg hover:shadow-xl transition-shadow">
    <CardHeader className="flex flex-row items-center gap-4">
      <div className="bg-[var(--color-mosala-green-100)] rounded-full p-3">
        <Briefcase className="h-6 w-6 text-[var(--color-mosala-green-600)]" />
      </div>
      <div>
        <CardTitle className="text-[var(--color-mosala-dark-700)] text-lg font-bold">{job.title}</CardTitle>
        <CardDescription className="text-[var(--color-mosala-dark-300)] text-sm">{job.company} • {job.location}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-[var(--color-mosala-dark-600)] mb-2 line-clamp-3">{job.description}</p>
      <div className="flex flex-wrap gap-2 text-xs mt-2">
        <span className="bg-[var(--color-mosala-yellow-50)] text-[var(--color-mosala-yellow-700)] px-2 py-1 rounded">{job.type}</span>
        <span className="bg-[var(--color-mosala-green-50)] text-[var(--color-mosala-green-700)] px-2 py-1 rounded flex items-center gap-1"><Clock className="h-3 w-3" />{job.postedAgo}</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button asChild className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)] w-full font-semibold">
        <a href={job.url} target="_blank" rel="noopener noreferrer">Voir l'offre</a>
      </Button>
    </CardFooter>
  </Card>
);

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const { data: jobs, isLoading, isError } = useJobs();

  const filteredJobs = jobs?.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    (location ? job.location.toLowerCase().includes(location.toLowerCase()) : true) &&
    (type ? job.type === type : true)
  ) || [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-dark-900)] via-[var(--color-mosala-dark-800)] to-[var(--color-mosala-dark-500)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-transparent bg-clip-text">Trouver un emploi</h1>
        <p className="text-lg text-[var(--color-mosala-dark-50)] mb-8">Découvrez les meilleures offres d'emploi et formations adaptées à votre profil.</p>
        <form className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center gap-2 bg-white/80 rounded-lg px-3 py-2">
            <Search className="h-5 w-5 text-mosala-dark-200" />
            <Input
              type="text"
              placeholder="Mots-clés (ex : développeur, marketing...)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-mosala-dark-700"
            />
          </div>
          <Input
            type="text"
            placeholder="Localisation (ex : Brazzaville)"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="bg-white/80 rounded-lg text-mosala-dark-700"
          />
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="bg-white/80 rounded-lg px-3 py-2 text-mosala-dark-700 border-none"
          >
            <option value="">Type</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="Freelance">Freelance</option>
          </select>
        </form>
        {isLoading && <Loader label="Chargement des offres…" />}
        {isError && <div className="text-center text-[var(--color-mosala-red-500)] py-12">Erreur lors du chargement des offres.</div>}
        {!isLoading && !isError && filteredJobs.length === 0 && (
          <div className="text-center text-[var(--color-mosala-dark-200)] py-12">Aucune offre ne correspond à votre recherche.</div>
        )}
        <div>
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
