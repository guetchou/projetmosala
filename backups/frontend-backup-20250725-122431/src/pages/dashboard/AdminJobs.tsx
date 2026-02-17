import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Plus,
  Download,
  Building,
  MapPin,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data - à remplacer par API réelle
const mockJobs = [
  {
    id: 1,
    title: "Développeur React",
    company: "TechCongo",
    city: "Brazzaville",
    type: "CDI",
    status: "active",
    createdAt: "2024-03-15",
    applications: 24,
    salary: "800,000 - 1,200,000 FCFA",
    experience: "2-5 ans",
    remote: "Hybride"
  },
  {
    id: 2,
    title: "Chargé de communication",
    company: "ONG Espoir",
    city: "Pointe-Noire",
    type: "CDD",
    status: "active",
    createdAt: "2024-03-10",
    applications: 18,
    salary: "600,000 - 900,000 FCFA",
    experience: "1-3 ans",
    remote: "Présentiel"
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Banque Centrale",
    city: "Brazzaville",
    type: "Stage",
    status: "pending",
    createdAt: "2024-03-20",
    applications: 8,
    salary: "400,000 FCFA",
    experience: "Étudiant",
    remote: "Présentiel"
  },
  {
    id: 4,
    title: "Chef de projet digital",
    company: "InnovTech",
    city: "Dolisie",
    type: "CDI",
    status: "active",
    createdAt: "2024-03-05",
    applications: 32,
    salary: "1,200,000 - 1,800,000 FCFA",
    experience: "5-8 ans",
    remote: "Hybride"
  },
  {
    id: 5,
    title: "Designer UX/UI",
    company: "StartupXYZ",
    city: "Brazzaville",
    type: "Freelance",
    status: "active",
    createdAt: "2024-03-12",
    applications: 15,
    salary: "À négocier",
    experience: "3-6 ans",
    remote: "Remote"
  }
];

const AdminJobs = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                       job.company.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || job.type === typeFilter;
    const matchStatus = statusFilter === "all" || job.status === statusFilter;
    const matchCity = cityFilter === "all" || job.city === cityFilter;
    return matchSearch && matchType && matchStatus && matchCity;
  });

  const getTypeBadge = (type: string) => {
    const colors = {
      "CDI": "bg-green-100 text-green-800",
      "CDD": "bg-blue-100 text-blue-800",
      "Stage": "bg-yellow-100 text-yellow-800",
      "Freelance": "bg-purple-100 text-purple-800"
    };
    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      expired: "bg-red-100 text-red-800"
    };
    return <Badge className={colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{status}</Badge>;
  };

  const getRemoteBadge = (remote: string) => {
    const colors = {
      "Présentiel": "bg-blue-100 text-blue-800",
      "Hybride": "bg-orange-100 text-orange-800",
      "Remote": "bg-green-100 text-green-800"
    };
    return <Badge className={colors[remote as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{remote}</Badge>;
  };

  const handleDeleteJob = (jobId: number) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  return (
    <DashboardLayout
      title="Gestion des Offres d'Emploi"
      subtitle="Gérez les offres d'emploi et les candidatures"
      role="admin"
    >
      <div className="space-y-6">
        {/* Header avec actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-mosala-dark-700)]">
              {filteredJobs.length} offre{filteredJobs.length > 1 ? 's' : ''} d'emploi
            </h2>
            <p className="text-[var(--color-mosala-dark-400)]">
              Gérez les offres et suivez les candidatures
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-[var(--color-mosala-green-500)] hover:bg-[var(--color-mosala-green-600)] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Publier une offre
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--color-mosala-dark-400)]" />
            <Input
              placeholder="Rechercher une offre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="CDI">CDI</SelectItem>
              <SelectItem value="CDD">CDD</SelectItem>
              <SelectItem value="Stage">Stage</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="expired">Expiré</SelectItem>
            </SelectContent>
          </Select>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les villes</SelectItem>
              <SelectItem value="Brazzaville">Brazzaville</SelectItem>
              <SelectItem value="Pointe-Noire">Pointe-Noire</SelectItem>
              <SelectItem value="Dolisie">Dolisie</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Tableau */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg border border-[var(--color-mosala-green-100)] overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-[var(--color-mosala-green-50)]">
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Offre</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Entreprise</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Type</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Statut</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Candidatures</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Salaire</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-[var(--color-mosala-green-50)]/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--color-mosala-green-100)] rounded-full flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-mosala-dark-700)]">{job.title}</div>
                        <div className="flex items-center gap-2 text-sm text-[var(--color-mosala-dark-400)]">
                          <MapPin className="w-4 h-4" />
                          {job.city}
                        </div>
                        <div className="text-xs text-[var(--color-mosala-dark-300)]">
                          {getRemoteBadge(job.remote)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[var(--color-mosala-dark-400)]" />
                      <span className="font-medium text-[var(--color-mosala-dark-700)]">{job.company}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTypeBadge(job.type)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(job.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[var(--color-mosala-dark-400)]" />
                      <span className="font-semibold text-[var(--color-mosala-dark-700)]">{job.applications}</span>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-[var(--color-mosala-dark-600)]">
                      {job.salary}
                    </div>
                    <div className="text-xs text-[var(--color-mosala-dark-400)]">
                      {job.experience}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-[var(--color-mosala-green-50)] p-4 rounded-xl border border-[var(--color-mosala-green-100)]">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Total offres</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {jobs.length}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-yellow-50)] p-4 rounded-xl border border-[var(--color-mosala-yellow-100)]">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--color-mosala-yellow-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Candidatures</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {jobs.reduce((sum, job) => sum + job.applications, 0)}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-orange-50)] p-4 rounded-xl border border-[var(--color-mosala-orange-100)]">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-[var(--color-mosala-orange-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Entreprises</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {new Set(jobs.map(job => job.company)).size}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-red-50)] p-4 rounded-xl border border-[var(--color-mosala-red-100)]">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-mosala-red-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Ce mois</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {jobs.filter(job => new Date(job.createdAt).getMonth() === new Date().getMonth()).length}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminJobs; 