import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Filter, 
  Eye,
  Download,
  Building,
  Calendar,
  Star,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  TrendingUp
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data - à remplacer par API réelle
const mockApplications = [
  {
    id: 1,
    job: {
      title: "Développeur React",
      company: "TechCongo",
      city: "Brazzaville",
      type: "CDI",
      salary: "800,000 - 1,200,000 FCFA"
    },
    status: "pending",
    appliedAt: "2024-03-20",
    lastUpdate: "2024-03-20",
    matchScore: 85,
    notes: "Candidature bien reçue, en cours d'étude"
  },
  {
    id: 2,
    job: {
      title: "Designer UX/UI",
      company: "StartupXYZ",
      city: "Brazzaville",
      type: "CDI",
      salary: "600,000 - 900,000 FCFA"
    },
    status: "accepted",
    appliedAt: "2024-03-15",
    lastUpdate: "2024-03-18",
    matchScore: 92,
    notes: "Félicitations ! Votre candidature a été retenue"
  },
  {
    id: 3,
    job: {
      title: "Chef de projet digital",
      company: "InnovTech",
      city: "Dolisie",
      type: "CDI",
      salary: "1,200,000 - 1,800,000 FCFA"
    },
    status: "rejected",
    appliedAt: "2024-03-10",
    lastUpdate: "2024-03-12",
    matchScore: 45,
    notes: "Expérience insuffisante pour ce poste"
  },
  {
    id: 4,
    job: {
      title: "Data Analyst",
      company: "Banque Centrale",
      city: "Brazzaville",
      type: "Stage",
      salary: "400,000 FCFA"
    },
    status: "interview",
    appliedAt: "2024-03-18",
    lastUpdate: "2024-03-19",
    matchScore: 78,
    notes: "Entretien prévu le 25 mars à 14h"
  },
  {
    id: 5,
    job: {
      title: "Chargé de communication",
      company: "ONG Espoir",
      city: "Pointe-Noire",
      type: "CDD",
      salary: "500,000 - 700,000 FCFA"
    },
    status: "pending",
    appliedAt: "2024-03-21",
    lastUpdate: "2024-03-21",
    matchScore: 67,
    notes: "Candidature en cours d'examen"
  }
];

const CandidateApplications = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const filteredApplications = applications.filter(app => {
    const matchSearch = app.job.title.toLowerCase().includes(search.toLowerCase()) || 
                       app.job.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || app.status === statusFilter;
    const matchType = typeFilter === "all" || app.job.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      interview: "bg-blue-100 text-blue-800"
    };
    const labels = {
      pending: "En attente",
      accepted: "Acceptée",
      rejected: "Refusée",
      interview: "Entretien"
    };
    return <Badge className={colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
      {labels[status as keyof typeof labels] || status}
    </Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "interview":
        return <Calendar className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <DashboardLayout
      title="Mes Candidatures"
      subtitle="Suivez vos candidatures et leur progression"
      role="candidate"
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
              {filteredApplications.length} candidature{filteredApplications.length > 1 ? 's' : ''}
            </h2>
            <p className="text-[var(--color-mosala-dark-400)]">
              Suivez vos candidatures et leur progression
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-[var(--color-mosala-green-500)] hover:bg-[var(--color-mosala-green-600)] text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Voir les offres
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
              placeholder="Rechercher une candidature..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="interview">Entretien</SelectItem>
              <SelectItem value="accepted">Acceptée</SelectItem>
              <SelectItem value="rejected">Refusée</SelectItem>
            </SelectContent>
          </Select>
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
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Statut</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Date</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Score</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-[var(--color-mosala-green-50)]/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--color-mosala-green-100)] rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-mosala-dark-700)]">{app.job.title}</div>
                        <div className="flex items-center gap-1 text-sm text-[var(--color-mosala-dark-400)]">
                          <MapPin className="w-4 h-4" />
                          {app.job.city}
                        </div>
                        <div className="text-xs text-[var(--color-mosala-dark-300)]">{app.job.salary}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[var(--color-mosala-dark-400)]" />
                      <span className="font-medium text-[var(--color-mosala-dark-700)]">{app.job.company}</span>
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">{app.job.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(app.status)}
                      {getStatusBadge(app.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm text-[var(--color-mosala-dark-400)]">
                        <Calendar className="w-4 h-4" />
                        Candidature: {new Date(app.appliedAt).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[var(--color-mosala-dark-300)]">
                        <Clock className="w-3 h-3" />
                        MAJ: {new Date(app.lastUpdate).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className={`font-semibold ${getMatchScoreColor(app.matchScore)}`}>
                        {app.matchScore}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MessageSquare className="w-4 h-4" />
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
              <FileText className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Total</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {applications.length}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-yellow-50)] p-4 rounded-xl border border-[var(--color-mosala-yellow-100)]">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--color-mosala-yellow-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">En attente</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {applications.filter(app => app.status === 'pending').length}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-blue-50)] p-4 rounded-xl border border-[var(--color-mosala-blue-100)]">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-mosala-blue-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Entretiens</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {applications.filter(app => app.status === 'interview').length}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-green-50)] p-4 rounded-xl border border-[var(--color-mosala-green-100)]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Acceptées</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {applications.filter(app => app.status === 'accepted').length}
            </div>
          </div>
        </motion.div>

        {/* Conseils et améliorations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gradient-to-r from-[var(--color-mosala-green-50)] to-[var(--color-mosala-yellow-50)] p-6 rounded-xl border border-[var(--color-mosala-green-100)]"
        >
          <h3 className="text-lg font-semibold text-[var(--color-mosala-dark-700)] mb-4">
            💡 Conseils pour améliorer vos candidatures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[var(--color-mosala-dark-600)]">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>Personnalisez votre CV pour chaque offre</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>Ajoutez une lettre de motivation</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>Mettez à jour vos compétences</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>Suivez les entreprises qui vous intéressent</span>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateApplications; 