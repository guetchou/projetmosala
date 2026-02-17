import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  User,
  Calendar,
  Star,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle
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
    candidate: {
      name: "Jean Mavoungou",
      email: "jean.mavoungou@email.com",
      avatar: "/avatars/jean.jpg"
    },
    job: {
      title: "Développeur React",
      company: "TechCongo"
    },
    status: "pending",
    appliedAt: "2024-03-20",
    experience: "3 ans",
    skills: ["React", "Node.js", "TypeScript"],
    rating: 4.5,
    notes: "Profil intéressant, bon niveau technique"
  },
  {
    id: 2,
    candidate: {
      name: "Aline Samba",
      email: "aline.samba@email.com",
      avatar: "/avatars/aline.jpg"
    },
    job: {
      title: "Designer UX/UI",
      company: "StartupXYZ"
    },
    status: "accepted",
    appliedAt: "2024-03-18",
    experience: "5 ans",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    rating: 4.8,
    notes: "Excellente créativité, portfolio impressionnant"
  },
  {
    id: 3,
    candidate: {
      name: "Pierre Nkouka",
      email: "pierre.nkouka@email.com",
      avatar: "/avatars/pierre.jpg"
    },
    job: {
      title: "Chef de projet digital",
      company: "InnovTech"
    },
    status: "rejected",
    appliedAt: "2024-03-15",
    experience: "2 ans",
    skills: ["Gestion de projet", "Agile", "Scrum"],
    rating: 3.2,
    notes: "Expérience insuffisante pour le poste"
  },
  {
    id: 4,
    candidate: {
      name: "Celestine Elenga",
      email: "celestine.elenga@email.com",
      avatar: "/avatars/celestine.jpg"
    },
    job: {
      title: "Data Analyst",
      company: "Banque Centrale"
    },
    status: "interview",
    appliedAt: "2024-03-19",
    experience: "4 ans",
    skills: ["Python", "SQL", "Tableau"],
    rating: 4.2,
    notes: "Bon profil, à convoquer pour entretien"
  },
  {
    id: 5,
    candidate: {
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      avatar: "/avatars/marie.jpg"
    },
    job: {
      title: "Chargé de communication",
      company: "ONG Espoir"
    },
    status: "pending",
    appliedAt: "2024-03-21",
    experience: "1 an",
    skills: ["Communication", "Réseaux sociaux", "Rédaction"],
    rating: 3.8,
    notes: "Jeune diplômée motivée"
  }
];

const RecruiterApplications = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const filteredApplications = applications.filter(app => {
    const matchSearch = app.candidate.name.toLowerCase().includes(search.toLowerCase()) || 
                       app.candidate.email.toLowerCase().includes(search.toLowerCase()) ||
                       app.job.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || app.status === statusFilter;
    const matchJob = jobFilter === "all" || app.job.title === jobFilter;
    return matchSearch && matchStatus && matchJob;
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

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  const handleDeleteApplication = (applicationId: number) => {
    setApplications(prev => prev.filter(app => app.id !== applicationId));
  };

  return (
    <DashboardLayout
      title="Mes Candidatures"
      subtitle="Gérez les candidatures reçues pour vos offres"
      role="recruiter"
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
              Gérez et suivez les candidatures
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-[var(--color-mosala-green-500)] hover:bg-[var(--color-mosala-green-600)] text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Envoyer un message
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
          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Offre d'emploi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les offres</SelectItem>
              <SelectItem value="Développeur React">Développeur React</SelectItem>
              <SelectItem value="Designer UX/UI">Designer UX/UI</SelectItem>
              <SelectItem value="Chef de projet digital">Chef de projet digital</SelectItem>
              <SelectItem value="Data Analyst">Data Analyst</SelectItem>
              <SelectItem value="Chargé de communication">Chargé de communication</SelectItem>
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
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Candidat</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Offre</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Statut</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Date</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Note</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-[var(--color-mosala-green-50)]/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--color-mosala-green-100)] rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-mosala-dark-700)]">{app.candidate.name}</div>
                        <div className="text-sm text-[var(--color-mosala-dark-400)]">{app.candidate.email}</div>
                        <div className="text-xs text-[var(--color-mosala-dark-300)]">{app.experience} d'expérience</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-[var(--color-mosala-dark-700)]">{app.job.title}</div>
                      <div className="text-sm text-[var(--color-mosala-dark-400)]">{app.job.company}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {app.skills.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {app.skills.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{app.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(app.status)}
                      {getStatusBadge(app.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-[var(--color-mosala-dark-400)]">
                      <Calendar className="w-4 h-4" />
                      {new Date(app.appliedAt).toLocaleDateString('fr-FR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-[var(--color-mosala-dark-700)]">{app.rating}</span>
                      <span className="text-sm text-[var(--color-mosala-dark-400)]">/5</span>
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
                      <Select value={app.status} onValueChange={(value) => handleStatusChange(app.id, value)}>
                        <SelectTrigger className="w-[120px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="interview">Entretien</SelectItem>
                          <SelectItem value="accepted">Acceptée</SelectItem>
                          <SelectItem value="rejected">Refusée</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDeleteApplication(app.id)}
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
      </div>
    </DashboardLayout>
  );
};

export default RecruiterApplications; 